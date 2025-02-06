// pages/blog/[pageNumber].js



import { getStaticPaths, getStaticProps } from 'next';



export async function getStaticPaths() {

  // const totalPages = 10; // Calculate total pages based on your data

  const pagesToPreRender = 5; // Pre-render the first 5 pages



  const paths = Array.from({ length: pagesToPreRender }).map((_, index) => ({

    params: { pageNumber: (index + 1).toString() } // Generate page number paths

  }));



  return {

    paths,

    fallback: 'blocking' // Server-side render if page not pre-rendered

  };

}



export async function getStaticProps({ params }) {

  const pageNumber = parseInt(params.pageNumber);

  // Fetch data for the specific page number

  const data = await fetch(`/api/posts?pageNumber=${pageNumber}`);

  return {

    props: { data }

  };

}
