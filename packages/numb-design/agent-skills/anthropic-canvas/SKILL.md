# Canvas Design — Anthropic Skills

AI-assisted visual art and philosophy creation skill. Specializes in generating beautiful, thought-provoking visuals (.png, .pdf) using canvas rendering techniques.

## Core Capabilities

1. **Visual Art Creation** — Generate abstract art, data visualizations, diagrams, and illustrations using canvas rendering
2. **Philosophical Visualization** — Create visual representations of abstract concepts, ideas, and philosophies
3. **Data Visualization** — Transform data into compelling visual narratives
4. **Diagram Generation** — Create system diagrams, flowcharts, architecture diagrams, and relationship maps
5. **Poster/Print Design** — Generate printable artwork with proper resolution and layout

## Techniques

### Canvas Rendering
- Use HTML Canvas 2D API for programmatic art generation
- Support for shapes, paths, gradients, patterns, and text
- Anti-aliased rendering for crisp output
- Export to PNG at 72-300 DPI depending on use case

### Visual Styles
- **Abstract/Surreal** — Generative shapes, color fields, organic forms
- **Minimalist** — Clean lines, ample whitespace, restrained palette
- **Data-Driven** — Charts, graphs, networks, trees
- **Diagrammatic** — Boxes, arrows, connections, annotations
- **Typographic** — Text as visual element, expressive typography

### Color Theory
- Complementary, analogous, triadic, monochromatic schemes
- Gradient generation with smooth color transitions
- Opacity and blending modes for depth
- Dark/light background adaptation

## Output Formats

- **PNG** — Best for screens, social media, web (lossless, transparency support)
- **PDF** — Best for printing, documents, high-resolution output (vector text, scalable)

## Use Cases

1. **Philosophical diagrams** — Visualize frameworks, mental models, systems thinking
2. **Concept art** — Abstract representations of ideas, metaphors, concepts
3. **Data storytelling** — Narrative-driven data visualization
4. **Visual essays** — Combine text and imagery in a single canvas
5. **Infographics** — Information-dense visual communication
6. **Abstract posters** — Generate printable artwork
7. **System architecture** — Diagram complex system relationships
8. **Mind maps** — Hierarchical concept visualization

## Best Practices

1. **Always set canvas resolution** for the intended output (2x for retina)
2. **Use `window.devicePixelRatio`** scaling for sharp rendering
3. **Organize drawing into layers** (background → shapes → text → overlays)
4. **Use `save()`/`restore()`** for isolated transformations
5. **Pre-define color palettes** before starting to ensure harmony
6. **Export at appropriate DPI** — 72 for web, 300 for print
7. **Test output** for legibility at intended display size

## Anti-Patterns
- Don't use canvas for standard UI layouts (use DOM/CSS)
- Don't forget devicePixelRatio scaling (results in blurry output)
- Don't hardcode pixel values without considering output resolution
- Don't ignore text legibility (ensure sufficient size and contrast)
- Don't render at larger than needed resolution (performance issue)
