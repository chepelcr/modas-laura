export function CountryFlag({ country }) {
  return (
    <svg
      className="country-flag"
      viewBox="0 0 190 100"
      aria-hidden="true"
      focusable="false"
    >
      {country === "cr" ? (
        <>
          <path fill="#002B7F" d="M0 0h190v100H0z" />
          <path fill="#fff" d="M0 16.667h190v66.666H0z" />
          <path fill="#CE1126" d="M0 33.333h190v33.334H0z" />
        </>
      ) : (
        <>
          <path fill="#fff" d="M0 0h190v100H0z" />
          {Array.from({ length: 7 }, (_, row) => (
            <rect
              key={row}
              fill="#B22234"
              y={(row * 200) / 13}
              width="190"
              height={100 / 13}
            />
          ))}
          <rect fill="#3C3B6E" width="76" height={700 / 13} />
          {Array.from({ length: 9 }, (_, row) =>
            Array.from({ length: row % 2 ? 5 : 6 }, (_, col) => (
              <path
                key={`${row}-${col}`}
                fill="#fff"
                d="M0-2.4 .54-.74 2.28-.74 .87.28 1.41 1.94 0 .91-1.41 1.94-.87.28-2.28-.74-.54-.74Z"
                transform={`translate(${((col + (row % 2 ? 1 : 0.5)) * 76) / 6}, ${((row + 1) * 700) / 130})`}
              />
            )),
          )}
        </>
      )}
    </svg>
  );
}
