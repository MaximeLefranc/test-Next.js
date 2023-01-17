export default function Index({ bitcoinPrice }) {
  return (
    <main className='main'>
      <h1 className='main__title'>Bienvenue sur mon portfolio</h1>
      <p>{bitcoinPrice}</p>
    </main>
  );
}

export async function getStaticProps() {
  let bitcoinEurPrice;
  await fetch('https://blockchain.info/ticker')
    .then((response) => response.json())
    .then((data) => {
      bitcoinEurPrice = data.EUR.last;
    });
  return {
    props: {
      bitcoinPrice: bitcoinEurPrice,
    },
  };
}
