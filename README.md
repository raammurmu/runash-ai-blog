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

### Community Posts

If your post is not an official RunAsh collaboration, please use our [Community Blog Editor](https://blog.runash.in/create). It includes a real-time preview and helper tools for:

* Image table formatting
* Tip boxes
* Reference styling

---

## 🚢 Publishing

1. Update `lib/blog-data.tsx` with your new post entry.
2. Open a **Pull Request**.
3. Once merged, the article goes live automatically.

**Questions?** Reach out to the team or check our [Assistant Space](https://blog.runash.in/create).

---

**Would you like me to create a template `.md` file or a GitHub Action to automate the `_blog.yml` updates?**
