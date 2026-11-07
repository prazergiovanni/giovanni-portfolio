// Canonical portfolio static Worker. No Netlify origin, no dynamic secrets.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/.") || url.pathname.includes(".."))
      return new Response("Not Found", { status: 404 });
    return env.ASSETS.fetch(request);
  },
};
