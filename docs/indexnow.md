# IndexNow operations

PCBuildCheck hosts its IndexNow ownership key at the canonical site root and submits only canonical HTTPS URLs for `www.pcbuildcheck.com`.

## First deployment

1. Deploy the commit containing the key file.
2. Confirm that `https://www.pcbuildcheck.com/6922b32107db9a951639002879cdc273.txt` returns only the configured key.
3. Generate the current sitemap with `npm run build`.
4. Submit the sitemap URLs once with `npm run indexnow:submit -- --all`.
5. Open Bing Webmaster Tools → IndexNow to confirm receipt.

## Later updates

Submit only URLs that were added, updated, or deleted:

```bash
npm run indexnow:submit -- /en/blog/example /it/blog/example
```

Use `--dry-run` to validate host and URL filtering without contacting IndexNow:

```bash
npm run indexnow:submit -- --dry-run /en /en/fps-calculator
```

IndexNow tells participating search engines that a URL changed. It does not guarantee crawling, indexing, or ranking. Keep the XML sitemap submitted in Bing Webmaster Tools and monitor URL Inspection for page-level indexing issues.
