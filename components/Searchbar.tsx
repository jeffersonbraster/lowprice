"use client";

import { scrapeAndStoreProduct } from "@/lib/actions";
import { url } from "inspector";
import { FormEvent, useState } from "react";

const isValidAmazonProductUrl = (url: string) => {
  try {
    const parsedURL = new URL(url)
    const hostname = parsedURL.hostname;

    // verifica se o hostname tem amazon
    if(hostname.includes('amazon.com') || hostname.includes('amazon.') || hostname.includes('amzn')) {
      return true;
    }
  } catch (error) {
    return false
  }

  return false
}

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidLink = isValidAmazonProductUrl(searchPrompt)

    if(!isValidLink) {
      alert('O link que você informou é invalido')
      return;
    }

    try {
      setIsLoading(true)

      const product = await scrapeAndStoreProduct(searchPrompt)
    } catch (error) {
      console.log(error)
    }finally {
      setIsLoading(false)
    }
  };

  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Cole o link do produto.."
        className="searchbar-input"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
      />

      <button type="submit" className="searchbar-btn" disabled={searchPrompt === ''}>
        {isLoading ? 'Carregando...' : 'Pesquisar'}
      </button>
    </form>
  );
};

export default Searchbar;
