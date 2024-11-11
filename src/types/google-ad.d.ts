interface GoogleAdProps {
  slot: string;
}

declare module '@/components/GoogleAd' {
  const GoogleAd: React.FC<GoogleAdProps>;
  export default GoogleAd;
} 