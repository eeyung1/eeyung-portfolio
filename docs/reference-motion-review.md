# Portfolio reference: visual and motion review

Reference: https://freshpex.vercel.app/ and the owner-supplied 40-second recording, reviewed November 17, 2026.

## What defines the reference

| Layer | Observed behaviour | Portfolio implementation |
| --- | --- | --- |
| Background field | Cyan points drift across a near-black viewport. Fine connections form branching, triangular constellations. This is a particle network rather than literal illustrated trees. | Canvas nodes with distance-faded edges; bounded density and neighbour count. |
| Continuity | The field remains visible through the introduction, biography, experience, education, projects and contact areas. | A single fixed background in the root layout, also present on case studies. |
| Atmospheric colour | Blue and purple glows add depth behind the network. | CSS radial colour fields with a slow drift. |
| Hero | Large centered gradient name, typewriter role, short introduction and prominent actions. | Centered viewport-height hero, colour-shifting name, three engineering roles and two existing contact/work actions. |
| Panels | Dark translucent surfaces separate reading areas from the moving background. | Translucent project, capability and activity panels; tinted section surfaces. |
| Interaction | Project cards and buttons provide hover feedback; the navigation remains visible. | Hover/focus border and elevation, gradient action button and translucent sticky navigation. |
| Supporting content | Photograph appears within the biography, leaving the opening available for the network. | Existing portrait moved to About. |
| Intro loader | A code-themed loading sequence precedes the content. | Deliberately omitted to keep server-rendered content immediately available. |

The previous release matched a colour palette but missed the persistent field, centered hero and role animation. Those are the scope of this correction. Existing case studies, collaboration attribution, contact links, filters and theme controls remain integrated with the new presentation.

## Motion and reading controls

- Background canvas is decorative, ignores pointer events and is excluded from the accessibility tree.
- A visible pause/play button stops the canvas, typewriter and CSS keyframes. OS reduced-motion settings take precedence and render a static constellation.
- A stable screen-reader role description prevents repeated announcements of changing letters.
- A fine pointer creates proximity connections; touch scrolling is not intercepted.
- Desktop uses at most 90 nodes, phone layouts at most 32, a maximum device-pixel ratio of 1.5 and a draw rate of 30fps. Hidden tabs cancel the frame loop. Resize, visibility and theme listeners are removed on unmount.
- Dark and light themes use different network colours. Panels retain enough background coverage for reading.

## Verification and limits

Pure tests check node density, frame-gap clamping, bouncing and connection bounds. CI adds a real Chromium run against the production build: animated versus static canvas pixels, pause, reduced motion, viewport overflow at 320/390/768/1440px, catalogue expansion/filtering, theme persistence, mobile navigation and case-study routing. Desktop and mobile screenshots are attached to the CI run.

These are automated checks, not a physical-device performance certification or owner acceptance. The README keeps that acceptance item open. No metrics, employment history, certifications or shop inventory from the reference were copied.
