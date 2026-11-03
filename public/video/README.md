# Hero video

Drop the property film here with these exact names:

- `hero.webm` (preferred, smaller)
- `hero.mp4` (fallback)

The hero renders the poster photograph immediately and fades the video in
only after it can play. If neither file exists, the poster stays — there is no
broken state, and no page-load delay.

Recommended encoding:

```bash
# MP4 (H.264)
ffmpeg -i source.mov -vf "scale=1920:-2" -c:v libx264 -crf 24 -preset slow \
  -movflags +faststart -an public/video/hero.mp4

# WebM (VP9)
ffmpeg -i source.mov -vf "scale=1920:-2" -c:v libvpx-vp9 -crf 34 -b:v 0 -an \
  public/video/hero.webm
```

Keep each file under ~6 MB. The video is muted, looping, and decorative.
