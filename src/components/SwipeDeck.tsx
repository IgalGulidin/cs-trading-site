"use client";
// ☝️ "use client" = this component runs in the BROWSER (it needs touch/mouse events
// and state). Pages are Server Components by default; they can render this one.

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "motion/react";
import type { Listing } from "@/types/item";
import { ListingCard } from "@/components/ListingCard";

type Direction = "left" | "right";

// How far (px) or how fast (px/s) you must fling the card for it to count as a swipe.
const SWIPE_DISTANCE = 120;
const SWIPE_VELOCITY = 500;
const FLY_OUT_DISTANCE = 600;

type Props = {
  listings: Listing[];
};

export function SwipeDeck({ listings }: Props) {
  // Which listing is on top right now.
  const [index, setIndex] = useState(0);
  // IDs of listings swiped right. (Later this goes to the database → /likes page.)
  const [likedIds, setLikedIds] = useState<string[]>([]);

  // x = how far the top card is dragged sideways. A MotionValue updates on every
  // frame WITHOUT re-rendering React, which keeps the drag smooth on phones.
  const x = useMotionValue(0);
  // Derived values: tilt the card and fade in the LIKE / NOPE stamps as you drag.
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [20, SWIPE_DISTANCE], [0, 1]);
  const nopeOpacity = useTransform(x, [-SWIPE_DISTANCE, -20], [1, 0]);

  // Stops double-swipes while the fly-out animation is still playing.
  const isAnimating = useRef(false);

  const current = listings[index];
  const next = listings[index + 1];

  function swipe(direction: Direction) {
    if (!current || isAnimating.current) return;
    isAnimating.current = true;

    if (direction === "right") {
      setLikedIds((ids) => [...ids, current.id]);
    }

    // Fly the card off screen, THEN show the next one.
    animate(x, direction === "right" ? FLY_OUT_DISTANCE : -FLY_OUT_DISTANCE, {
      duration: 0.25,
      onComplete: () => {
        setIndex((i) => i + 1);
        x.set(0); // the next card starts in the middle
        isAnimating.current = false;
      },
    });
  }

  function handleDragEnd(
    _event: PointerEvent | MouseEvent | TouchEvent,
    info: PanInfo,
  ) {
    const { offset, velocity } = info;
    if (offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY) {
      swipe("right");
    } else if (offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY) {
      swipe("left");
    } else {
      // Not far enough → spring back to the middle.
      animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
    }
  }

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowLeft") {
          swipe("left");
        } else if (event.key === "ArrowRight") {
          swipe("right");
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    });
  

  // Ran out of cards.
  if (!current) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <p className="text-lg font-semibold">No more listings 🎉</p>
        <p className="text-sm text-zinc-400">
          You liked {likedIds.length} listing(s).
        </p>
        <button
          onClick={() => setIndex(0)}
          className="rounded-full bg-zinc-800 px-5 py-2 text-sm hover:bg-zinc-700"
        >
          Start over
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* The stack: both cards sit in the same grid cell, so they overlap. */}
      <div className="grid select-none">
        {next && (
          <div
            className="pointer-events-none scale-95 opacity-60 [grid-area:1/1]"
            aria-hidden
          >
            <ListingCard listing={next} />
          </div>
        )}

        <motion.div
          key={current.id}
          className="relative cursor-grab touch-pan-y active:cursor-grabbing [grid-area:1/1] [&_img]:pointer-events-none"
          style={{ x, rotate }}
          drag="x"
          dragMomentum={false}
          onDragEnd={handleDragEnd}
        >
          <ListingCard listing={current} />

          {/* Stamps that fade in while dragging */}
          <motion.span
            style={{ opacity: likeOpacity }}
            className="absolute top-6 left-6 -rotate-12 rounded-lg border-4 border-green-400 px-3 py-1 text-2xl font-black text-green-400"
          >
            LIKE
          </motion.span>
          <motion.span
            style={{ opacity: nopeOpacity }}
            className="absolute top-6 right-6 rotate-12 rounded-lg border-4 border-red-400 px-3 py-1 text-2xl font-black text-red-400"
          >
            NOPE
          </motion.span>
        </motion.div>
      </div>

      {/* Buttons do the same as swiping — needed for desktop & accessibility. */}
      <div className="flex justify-center gap-8">
        <button
          onClick={() => swipe("left")}
          aria-label="Pass"
          className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-400 text-2xl text-red-400 hover:bg-red-400/10"
        >
          ✕
        </button>
        <button
          onClick={() => swipe("right")}
          aria-label="Like"
          className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-green-400 text-2xl text-green-400 hover:bg-green-400/10"
        >
          ♥
        </button>
      </div>
    </div>
  );
}
