# 🚀 RunAsh AI Blog


Welcome to the official **RunAsh Blog** repository. This project is a high-performance blog platform powered by [v0.dev](https://v0.dev) and [Vercel](https://vercel.com), designed for real-time AI content.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/raam-murmus-projects/v0-runash-ai-blog-app)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/0aaDbYrebuD)

---

## 🛠️ Tech Stack & Workflow

This repository stays in sync with **v0.dev**.

1. **Develop:** Modify the UI via the [v0.dev Project Interface](https://v0.dev/chat/projects/0aaDbYrebuD).
2. **Sync:** Deploying from v0 automatically pushes code to this GitHub repo.
3. **Deploy:** Vercel automatically picks up the changes and updates [blog.runash.in](https://blog.runash.in).

---

## ✍️ How to Write an Article

We welcome contributions! Please follow these steps to ensure your post is formatted correctly:

### 1. Branching & Post Entries

* Create a branch: `feature/YourName-Title`.
* Add a new entry in `lib/blog-data.tsx` with a unique `id`, `slug`, and `publishedAt`.

### 2. Handling Assets (Thumbnails & Images)

* **Thumbnail:** Create a folder in `/assets` with the same name as your `.md` file. Place your thumbnail here.
* **Other Images:** To keep the repo light, please host post images in the [RunAsh Documentation Images Repo](https://www.google.com/search?q=https://docs.runash.in).
* **Optimization:** Always compress images using [TinyPNG](https://tinypng.com) before uploading.

### 3. Content Configuration

Ensure the blog entry includes the title, excerpt, and content HTML string. Keep the `slug` URL-safe and match `thumbnail` paths to assets under `/public` when used.

### 4. Special Formatting

| Feature | Syntax Example |
| --- | --- |
| **LaTeX** | Use double backslashes: `\\( E = mc^2 \\)` |
| **Highlight Box** | Use custom HTML containers (see existing posts for class names). |
| **Captions** | Use a Markdown table or HTML `<figcaption>`. |
| **Interactive** | You can embed Gradio spaces using the `<gradio-app>` script tag. |

---

## 🎨 Creative Guidelines

### Responsive Thumbnails

* **Dimensions:** 1300 x 650 pixels.
* **Templates:** Use our [Figma Template](https://www.figma.com/file/sXrf9VtkkbWI7kCIesMkDY/HF-Blog-Template?node-id=351%3A39) to maintain brand consistency.

### Blog UI conventions

For layout consistency across blog pages:

- Reuse shared UI layout classes from `lib/ui-conventions.ts` (for page containers, shell widths, and shell paddings).
- Prefer semantic design tokens (`bg-background`, `bg-muted`, `text-foreground`, etc.) over one-off hex colors when an equivalent utility exists.
- Keep interaction logs lightweight and structured via `lib/client-logger.ts`; avoid logging user-generated text or sensitive commerce/payment data.

---

## 🔐 Upload Storage Environment Variables

The upload API uses **Cloudinary** for permanent public files and falls back to local `/public/uploads` storage in development.

Add these variables to your environment:

```bash
# Required in production for cloud uploads
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Optional: explicit environment mode
NODE_ENV=development
```

Notes:
- Configure Cloudinary credentials in Vercel Project Settings → Environment Variables.
- Without Cloudinary credentials, uploads only work in local development and are saved to `public/uploads`.
- The upload API enforces max file size (10MB), allowed MIME types, and sanitizes filenames before storage.

---

## 🚢 Publishing

1. Update `lib/blog-data.tsx` with your new post entry.
2. Open a **Pull Request**.
3. Once merged, the article goes live automatically.

**Questions?** Reach out to the team for publishing support.

---

**Would you like me to create a template `.md` file or a GitHub Action to automate the `_blog.yml` updates?**
