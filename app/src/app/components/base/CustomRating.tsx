import React from "react";

export default function CustomRating({ rating }: { rating: number }) {
  return (
    <div
      className="rr--group rr--dir-x rr--space-sm myrr"
      role="img"
      aria-label={`Rated ${rating / 2} on ${rating / 2}`}
    >
      <div className={rating >= 5.6 ? `rr--box rr--on` : `rr--box rr--off`}>
        <svg
          aria-hidden="true"
          className="rr--svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24.99 24.1"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            shapeRendering="geometricPrecision"
            transform="translate(-87.55 -48.8)"
          >
            <path d="M112.46,57.88c-.23-.72-.88-1.22-1.63-1.27l-6.63-.46-2.45-6.19c-.27-.7-.95-1.16-1.7-1.16h0c-.75,0-1.42,.46-1.7,1.16l-2.5,6.23-6.58,.42c-.75,.05-1.4,.55-1.63,1.27-.24,.73,0,1.53,.58,2.02l5.07,4.28-1.51,5.92c-.21,.82,.1,1.69,.78,2.19,.66,.48,1.55,.5,2.24,.07l5.23-3.31h.02l5.63,3.56c.29,.19,.63,.29,.97,.29,1.02,0,1.83-.84,1.83-1.86,0-.16-.02-.31-.06-.47l-1.6-6.48,5.04-4.2c.59-.49,.82-1.29,.58-2.02Z"></path>
          </g>
        </svg>
      </div>
      <div className={rating >= 6.6 ? `rr--box rr--on` : `rr--box rr--off`}>
        <svg
          aria-hidden="true"
          className="rr--svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24.99 24.1"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            shapeRendering="geometricPrecision"
            transform="translate(-87.55 -48.8)"
          >
            <path d="M112.46,57.88c-.23-.72-.88-1.22-1.63-1.27l-6.63-.46-2.45-6.19c-.27-.7-.95-1.16-1.7-1.16h0c-.75,0-1.42,.46-1.7,1.16l-2.5,6.23-6.58,.42c-.75,.05-1.4,.55-1.63,1.27-.24,.73,0,1.53,.58,2.02l5.07,4.28-1.51,5.92c-.21,.82,.1,1.69,.78,2.19,.66,.48,1.55,.5,2.24,.07l5.23-3.31h.02l5.63,3.56c.29,.19,.63,.29,.97,.29,1.02,0,1.83-.84,1.83-1.86,0-.16-.02-.31-.06-.47l-1.6-6.48,5.04-4.2c.59-.49,.82-1.29,.58-2.02Z"></path>
          </g>
        </svg>
      </div>
      <div className={rating >= 7.6 ? `rr--box rr--on` : `rr--box rr--off`}>
        <svg
          aria-hidden="true"
          className="rr--svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24.99 24.1"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            shapeRendering="geometricPrecision"
            transform="translate(-87.55 -48.8)"
          >
            <path d="M112.46,57.88c-.23-.72-.88-1.22-1.63-1.27l-6.63-.46-2.45-6.19c-.27-.7-.95-1.16-1.7-1.16h0c-.75,0-1.42,.46-1.7,1.16l-2.5,6.23-6.58,.42c-.75,.05-1.4,.55-1.63,1.27-.24,.73,0,1.53,.58,2.02l5.07,4.28-1.51,5.92c-.21,.82,.1,1.69,.78,2.19,.66,.48,1.55,.5,2.24,.07l5.23-3.31h.02l5.63,3.56c.29,.19,.63,.29,.97,.29,1.02,0,1.83-.84,1.83-1.86,0-.16-.02-.31-.06-.47l-1.6-6.48,5.04-4.2c.59-.49,.82-1.29,.58-2.02Z"></path>
          </g>
        </svg>
      </div>
      <div className={rating >= 8.6 ? `rr--box rr--on` : `rr--box rr--off`}>
        <svg
          aria-hidden="true"
          className="rr--svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24.99 24.1"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            shapeRendering="geometricPrecision"
            transform="translate(-87.55 -48.8)"
          >
            <path d="M112.46,57.88c-.23-.72-.88-1.22-1.63-1.27l-6.63-.46-2.45-6.19c-.27-.7-.95-1.16-1.7-1.16h0c-.75,0-1.42,.46-1.7,1.16l-2.5,6.23-6.58,.42c-.75,.05-1.4,.55-1.63,1.27-.24,.73,0,1.53,.58,2.02l5.07,4.28-1.51,5.92c-.21,.82,.1,1.69,.78,2.19,.66,.48,1.55,.5,2.24,.07l5.23-3.31h.02l5.63,3.56c.29,.19,.63,.29,.97,.29,1.02,0,1.83-.84,1.83-1.86,0-.16-.02-.31-.06-.47l-1.6-6.48,5.04-4.2c.59-.49,.82-1.29,.58-2.02Z"></path>
          </g>
        </svg>
      </div>
      <div className={rating >= 9.6 ? `rr--box rr--on` : `rr--box rr--off`}>
        <svg
          aria-hidden="true"
          className="rr--svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24.99 24.1"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            shapeRendering="geometricPrecision"
            transform="translate(-87.55 -48.8)"
          >
            <path d="M112.46,57.88c-.23-.72-.88-1.22-1.63-1.27l-6.63-.46-2.45-6.19c-.27-.7-.95-1.16-1.7-1.16h0c-.75,0-1.42,.46-1.7,1.16l-2.5,6.23-6.58,.42c-.75,.05-1.4,.55-1.63,1.27-.24,.73,0,1.53,.58,2.02l5.07,4.28-1.51,5.92c-.21,.82,.1,1.69,.78,2.19,.66,.48,1.55,.5,2.24,.07l5.23-3.31h.02l5.63,3.56c.29,.19,.63,.29,.97,.29,1.02,0,1.83-.84,1.83-1.86,0-.16-.02-.31-.06-.47l-1.6-6.48,5.04-4.2c.59-.49,.82-1.29,.58-2.02Z"></path>
          </g>
        </svg>
      </div>
    </div>
  );
}
