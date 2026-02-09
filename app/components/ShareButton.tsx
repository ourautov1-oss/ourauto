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
      className="px-4 py-2 rounded bg-blue-600 text-white w-full"
    >
      🔗 Share Car
    </button>
  );
}
