# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Ian Eisenberg, hosted on GitHub Pages. It's a static HTML/CSS/JS site built on the "Personify" template from Colorlib.

## Architecture

**Page Structure:**
- `index.html` - Main bio/landing page
- `publications.html` - Dynamically loads publications from `publications.json`
- `AI.html` - AI governance work and interests
- `neuroscience.html` - Neuroscience background
- `contact.html` - Contact information
- `nav.html` - Shared navigation component loaded via jQuery `.load()`

**Data:**
- `publications.json` - Contains publications, policy writings, blogs, and contributions. Each category is an array of objects with `title`, `source`, `date`, `link`, and optionally `journal`.

**Styling:**
- `css/style.css` - Main custom styles (built on Bootstrap)
- `css/bootstrap.css` - Bootstrap framework
- Uses Open Sans and Playfair Display fonts from Google Fonts

**JavaScript:**
- `js/main.js` - Site interactivity (offcanvas menu, owl carousel, waypoints animations)
- jQuery-based, uses Owl Carousel for sliders

## Key Patterns

**Navigation:** The nav is loaded dynamically into `#nav-placeholder` on each page using jQuery's `.load()` method. Active page highlighting is handled by matching the current URL path.

**Publications:** The publications page reads from `publications.json` and dynamically renders lists sorted by date (newest first) into `.academic-list`, `.policy-list`, `.blog-list`, and `.contributions-list` containers.

## Development

No build process required. Open HTML files directly in a browser or use any local server. Changes to `publications.json` will be reflected on the publications page.

To deploy: Push to `master` branch - GitHub Pages serves from master automatically.
