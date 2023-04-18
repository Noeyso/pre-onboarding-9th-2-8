import { useEffect, useState } from 'react';
import {
  Heading,
  Stack,
  Wrap,
  Button,
  HStack,
  useDisclosure,
  Fade,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { getProducts } from '@/store/slices/productSlice';
import Product from '@/components/main/ProductCard';
import { IProduct } from '@/interface/product';
import { useAppDispatch, useAppSelector } from '@/store';
import { useSearchParams } from 'react-router-dom';
import FilterList from './FilterList';

const ProductList = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);

  const [searchParams] = useSearchParams();

  const { isOpen, onToggle } = useDisclosure();

  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (!products) return;
    const spaces = searchParams.getAll('space');
    const prices = searchParams.getAll('price');

    if (!spaces && !prices) {
      setFilteredProducts(products);
      return;
    }

    setFilteredProducts(
      products.filter((value) => {
        const isMatchSpace = spaces.length
          ? spaces.includes(value.spaceCategory)
          : true;
        const isMatchPrice = prices.length
          ? value.price >= parseInt(prices[0]) &&
            value.price <= parseInt(prices[1])
          : true;
        return isMatchSpace && isMatchPrice;
      }),
    );
  }, [products, searchParams]);

  return (
    <Stack as="section" w="100%" minW="500px" p={4} position="relative">
      <HStack position="relative">
        <Heading mx="auto" mb="5">
          상품 정보
        </Heading>
        <Button position="absolute" top="0" right="60px" onClick={onToggle}>
          <SearchIcon mr="2" /> 필터
        </Button>
      </HStack>

      <Wrap spacing="30px" justify="center" pb="4">
        {filteredProducts &&
          filteredProducts.map((product: IProduct) => (
            <Product key={product.idx} {...product} />
          ))}
      </Wrap>
      <Fade in={isOpen}>
        <FilterList onToggle={onToggle} />
      </Fade>
    </Stack>
  );
};
export default ProductList;
