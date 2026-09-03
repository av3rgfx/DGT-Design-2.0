#!/usr/bin/env python3
"""Scarica Urbanist da Google Fonts e scrive un CSS con i font incorporati (data URI).

Uso: python3 fetch-fonts.py OUT.css [--weights 300;400;500;600]
Rispetta HTTPS_PROXY e SSL_CERT_FILE (in questo ambiente /root/.ccr/ca-bundle.crt).
"""
import base64, os, re, ssl, sys, urllib.request

UA = ("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) "
      "Chrome/124.0 Safari/537.36")

def ctx():
    cafile = os.environ.get("SSL_CERT_FILE")
    return ssl.create_default_context(cafile=cafile) if cafile else ssl.create_default_context()

def get(url, accept="*/*"):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": accept})
    with urllib.request.urlopen(req, context=ctx(), timeout=60) as r:
        return r.read()

def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(2)
    out = sys.argv[1]
    weights = "300;400;500;600"
    if "--weights" in sys.argv:
        weights = sys.argv[sys.argv.index("--weights") + 1]
    css_url = f"https://fonts.googleapis.com/css2?family=Urbanist:wght@{weights}&display=swap"
    css = get(css_url, "text/css").decode("utf-8")
    cache = {}
    def repl(m):
        url = m.group(1)
        if url not in cache:
            data = get(url)
            mime = "font/woff2" if url.endswith(".woff2") else "font/ttf"
            cache[url] = f"url(data:{mime};base64,{base64.b64encode(data).decode()})"
        return cache[url]
    css = re.sub(r"url\((https://fonts\.gstatic\.com/[^)]+)\)", repl, css)
    with open(out, "w") as f:
        f.write(css)
    print(f"scritto {out}: {len(cache)} file di font, {os.path.getsize(out)} byte")

if __name__ == "__main__":
    main()
