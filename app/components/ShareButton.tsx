"use client";

type Props = {
  title: string;
  price: number;
  city: string;
  url: string;
};


export default function ShareButton({ title, price, city, url }: Props) {
  const shareText = `Check out this verified car on OurAuto 🚗\n\n✔ Trusted Dealer Listing\n✔ Safe Marketplace\n✔ No Spam Calls\n\n${title}\nPrice: ₹${price}\nCity: ${city}\n\nView car:\n${url}`;

  async function handleShare() {
    if (navigator.share) {
      await navigator.share({
        title: title,
        text: shareText,
        url: url,
      });
    } else {
      await navigator.clipboard.writeText(shareText);
      alert("Link copied! Share it anywhere 👍");
    }
  }

  return (
    <button
      onClick={handleShare}
      className="rounded-xl bg-primary text-primary-foreground px-5 py-2.5 w-full font-semibold shadow-md transition-colors hover:bg-foreground/90 hover:text-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:focus:ring-offset-black"
    >
      🔗 Share Car
    </button>
  );
}
