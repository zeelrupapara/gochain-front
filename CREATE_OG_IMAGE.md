# How to Create the Social Sharing Preview Image (og-image.png)

When you share your ChainGo link on Upwork, Slack, Twitter, Facebook, or any other platform, they will show a preview card with a thumbnail image. This guide shows you how to create that image.

---

## Quick Method: Use the Template

I've created a ready-to-use HTML template that you can screenshot.

### Steps:

1. **Open the template file:**
   - Open `og-image-template.html` in your browser
   - Or open it directly: `open og-image-template.html` (Mac) or `start og-image-template.html` (Windows)

2. **Take a screenshot:**
   - The template is already sized perfectly (1200x630 pixels)
   - Press `F11` for fullscreen mode (removes browser UI)
   - Take a screenshot of just the card:
     - **Windows:** Use Snipping Tool or `Win + Shift + S`
     - **Mac:** Use `Cmd + Shift + 4` and drag to select the card
     - **Chrome:** Right-click > "Capture screenshot" (DevTools)

3. **Save the image:**
   - Save as: `og-image.png`
   - Move it to: `public/og-image.png`
   - Format: PNG (preferred) or JPG
   - Size: 1200x630 pixels (already correct if using template)

4. **Commit and push:**
   ```bash
   git add public/og-image.png
   git commit -m "Add social sharing preview image"
   git push
   ```

5. **Done!**
   - Vercel will deploy automatically
   - Wait 2-3 minutes for deployment
   - Test your link on any platform

---

## Alternative Method: Screenshot Your Live Site

If you prefer to use a real screenshot of your dashboard:

### Steps:

1. **Open your live site:**
   - Go to: https://gochain-front.vercel.app/

2. **Set browser window size:**
   - Use Chrome DevTools (F12)
   - Click "Toggle device toolbar" (phone icon)
   - Set custom dimensions: 1200 x 630
   - Take full-page screenshot

3. **Or use online tools:**
   - **Screely.com** - Add browser mockup frame
   - **Screenshot.rocks** - Create beautiful screenshots
   - **Browserframe.com** - Add browser chrome

4. **Crop to 1200x630:**
   - Use any image editor (Preview on Mac, Paint on Windows)
   - Or use online: **Canva.com**, **Figma.com**

5. **Save and add:**
   ```bash
   # Save as public/og-image.png
   git add public/og-image.png
   git commit -m "Add social sharing preview image"
   git push
   ```

---

## Design Tips for Great Preview Images

✅ **DO:**
- Use high contrast colors
- Keep text large and readable (minimum 24px)
- Focus on 1-2 key messages
- Include your project name/logo
- Use the center 2/3 of the image (edges may be cropped)
- Test on multiple platforms

❌ **DON'T:**
- Use small text (won't be readable)
- Overcrowd with information
- Use low contrast colors
- Include personal contact info
- Use copyrighted images/fonts

---

## Recommended Dimensions for Different Platforms

| Platform | Recommended Size | Aspect Ratio |
|----------|-----------------|--------------|
| Facebook / LinkedIn | 1200 x 630 | 1.91:1 |
| Twitter | 1200 x 675 | 16:9 |
| Instagram | 1080 x 1080 | 1:1 |
| General Open Graph | 1200 x 630 | 1.91:1 ✅ **Use this** |

We're using **1200x630** (Open Graph standard) because it works well across all platforms.

---

## Testing Your Preview Image

After deploying, test how your link looks:

1. **Facebook Debugger:**
   - Go to: https://developers.facebook.com/tools/debug/
   - Enter: `https://gochain-front.vercel.app/`
   - Click "Scrape Again" to refresh cache

2. **Twitter Card Validator:**
   - Go to: https://cards-dev.twitter.com/validator
   - Enter: `https://gochain-front.vercel.app/`
   - Click "Preview card"

3. **LinkedIn Post Inspector:**
   - Go to: https://www.linkedin.com/post-inspector/
   - Enter: `https://gochain-front.vercel.app/`
   - Click "Inspect"

4. **Generic Preview:**
   - Use: https://www.opengraph.xyz/
   - Enter your URL to see how it looks

---

## Troubleshooting

**Problem: Image not showing**
- Wait 5-10 minutes for deployment
- Clear the platform's cache using debugger tools above
- Check that file is exactly named `og-image.png` (case-sensitive)
- Verify file is in `public/` folder (not `src/`)

**Problem: Image looks blurry**
- Use PNG format instead of JPG
- Ensure image is exactly 1200x630 (not scaled)
- Don't use low-quality screenshots

**Problem: Wrong image showing**
- Clear browser cache
- Use the debugger tools above to force refresh
- Check that meta tags in index.html are correct

---

## What the Meta Tags Do

In your `index.html`, these tags tell platforms what to show:

```html
<!-- This is the image URL -->
<meta property="og:image" content="https://gochain-front.vercel.app/og-image.png" />

<!-- These help platforms size the image correctly -->
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

When someone shares your link, platforms read these tags and fetch the image.

---

## Example Preview

When you share `https://gochain-front.vercel.app/` on Upwork or any platform, they will see:

```
┌─────────────────────────────────────────┐
│  [Preview Image - og-image.png]         │
│                                         │
│  ChainGo - Blockchain Dashboard         │
│  Modern blockchain explorer built with  │
│  React 18, TypeScript, and Vite...      │
│                                         │
│  🔗 gochain-front.vercel.app            │
└─────────────────────────────────────────┘
```

This makes your link look professional and trustworthy!

---

**Ready?** Open `og-image-template.html` in your browser and take a screenshot! 📸
