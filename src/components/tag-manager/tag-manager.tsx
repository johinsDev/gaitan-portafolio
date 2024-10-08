import { loadSettings } from "@/sanity/loader/loadQuery";
import { GoogleTagManager } from "@next/third-parties/google";

export async function TagManager() {
  const { data } = await loadSettings();

  if (!data?.gtm) {
    return null;
  }

  return <GoogleTagManager gtmId={data?.gtm} />;
}

// Paste this code as high in the <head> of the page as possible:
// <!-- Google Tag Manager -->
// <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
// new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
// j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
// 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
// })(window,document,'script','dataLayer','GTM-WFJ2QPNK');</script>
// <!-- End Google Tag Manager -->

// Paste this code immediately after the opening <body> tag:
// <!-- Google Tag Manager (noscript) -->
// <noscript><iframe src="ns "
// height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
// <!-- End Google Tag Manager (noscript) -->
