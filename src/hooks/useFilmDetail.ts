import { useQuery } from '@tanstack/react-query';
import { Item } from 'models';
import React, { useEffect, useState } from 'react';
import { getRegions } from 'services';

type Props = {};

function useFilmDetail({}: Props) {
  const [film, setFilm] = useState({});
  const { data, isLoading, isError, error } = useQuery<Item[], Error>(['regions'], getRegions);

  console.log(data);

  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         setLoading(true);
  //         const product = await productApi.get(productId);
  //         setProduct(product);
  //       } catch (error) {
  //         console.log('Failed to fecth product', error);
  //       }

  //       setLoading(false);
  //     })();
  //   }, [productId]);

  return { data, isLoading, isError, error };
}

export default useFilmDetail;
