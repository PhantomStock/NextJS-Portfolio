# Adding Project Screenshots

## Quick Setup

1. **Take Screenshots**: Capture high-quality screenshots of your projects (1200x800px recommended)
2. **Name Your Files**: Save them as `project-1.png`, `project-2.png`, etc. in the `public/projects/` folder
3. **Update Mappings**: Edit `utils/project-images.ts` to map your repository names to specific images

## File Structure
\`\`\`
public/
  projects/
    project-1.png          # Your first project screenshot
    project-2.png          # Your second project screenshot
    project-3.png          # Your third project screenshot
    ...
\`\`\`

## Custom Mappings

Edit `utils/project-images.ts` to map specific repository names to images:

\`\`\`typescript
export const projectImages: Record<string, string> = {
  'my-awesome-app': '/projects/awesome-app-screenshot.png',
  'portfolio-site': '/projects/portfolio-screenshot.png',
  'ecommerce-store': '/projects/store-screenshot.png',
}
\`\`\`

## Screenshot Tips

1. **Resolution**: Use at least 1200x800px for crisp display
2. **Format**: PNG or JPG (PNG recommended for better quality)
3. **Content**: Show the main interface/dashboard of your application
4. **Consistency**: Try to maintain similar styling/theme across screenshots
5. **Mobile**: Consider showing responsive design or mobile views

## Fallback System

The system automatically falls back to:
1. Specific mapped images (if available)
2. Numbered images (`project-1.png`, etc.)
3. Generated placeholder images (if files don't exist)

## Adding New Projects

When you add new repositories:
1. Add a new screenshot to `public/projects/`
2. Update the mapping in `utils/project-images.ts`
3. The system will automatically use your new image
