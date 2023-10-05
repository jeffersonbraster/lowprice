import HeroCarousel from "@/components/HeroCarousel"
import Searchbar from "@/components/Searchbar"
import Image from "next/image"

const Home = () => {
  return (
    <>
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              A loja inteligente começa aqui:

              <Image src={"/assets/icons/arrow-right.svg"} alt="seta a direita" width={16} height={16} />
            </p>

            <h1 className="head-text">
              Liberte o poder do
              <span className="text-primary"> LowPrice</span>
            </h1>

            <p className="mt-6">
              análises poderosas e de auto-atendimento de produtos para ajudá-lo na sua descisão da sua compra com o menor preço.
            </p>

            <Searchbar />
          </div>

          <HeroCarousel />
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Tendências</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {['Apple Iphone 15', 'Book', 'Sneakers'].map((product) => (
            <div>{product}</div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home