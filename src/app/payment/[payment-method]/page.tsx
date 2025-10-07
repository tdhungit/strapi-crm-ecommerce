interface Props {
  params: Promise<{ 'payment-method': string }>;
}

export default async function PaymentMethod({ params }: Props) {
  const { 'payment-method': paymentMethod } = await params;

  return <div></div>;
}
