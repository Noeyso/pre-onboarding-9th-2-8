import React, { useEffect, useState } from 'react';
import {
  Heading,
  VStack,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Stack,
  Text,
  Box,
  Spacer,
  Button,
} from '@chakra-ui/react';
import { formatNumToWon } from '@/lib/utils/uiHelpers';
import { getMaxPrice, getUniqueSpaces } from '@/lib/utils/productsHelpers';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '@/store';
import SpaceTag from './SpaceTag';

type Props = {
  onToggle: () => void;
};

const FilterList = ({ onToggle }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { products } = useAppSelector((state) => state.products);

  const spaceList = getUniqueSpaces(products);

  const [defaultValues, setDefaultValues] = useState<number[]>();
  const [currentValues, setCurrentValues] = useState<number[]>([]);
  const [checkedFilters, setCheckedFilters] = useState<string[]>(
    searchParams.getAll('space'),
  );

  useEffect(() => {
    const priceRange = searchParams.getAll('price');

    if (priceRange.length && products.length) {
      setDefaultValues(
        priceRange.map(
          (value) => (parseInt(value) / getMaxPrice(products)) * 100,
        ),
      );
      setCurrentValues(priceRange.map((value) => parseInt(value)));
    } else {
      setDefaultValues([0, 100]);
      setCurrentValues([0, getMaxPrice(products)]);
    }
  }, [products, searchParams]);

  const onSlidePrice = (event: number[]) => {
    setCurrentValues(
      event.map((value) => Math.floor((value / 100) * getMaxPrice(products))),
    );
  };

  const onToggleSpace = (key: string) => {
    const isExists = checkedFilters.includes(key);
    if (isExists) {
      setCheckedFilters((prev) => prev.filter((v) => v !== key));
    } else {
      setCheckedFilters((prev) => [...prev, key]);
    }
  };

  const applyFilter = () => {
    setSearchParams({
      space: checkedFilters,
      price: currentValues.map((value) => `${value}`),
    });
    onToggle();
  };

  return (
    <Box
      position="absolute"
      top="60px"
      right="120px"
      bg="white"
      border="1px solid lightgray"
      borderRadius="2px"
      py="25px"
      px="20px"
    >
      <VStack as="section" w="400px" h="300px" justifyContent={'space-between'}>
        <Heading fontSize="lg" mb="20px">
          필터 옵션
        </Heading>
        <VStack>
          <Text>가격</Text>
          {defaultValues && (
            <RangeSlider defaultValue={defaultValues} onChange={onSlidePrice}>
              <RangeSliderTrack>
                <RangeSliderFilledTrack bg="#789BFB" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} bg="#b0c4fa" />
              <RangeSliderThumb index={1} bg="#b0c4fa" />
            </RangeSlider>
          )}
          <Text fontSize="12px">
            {formatNumToWon(currentValues[0])} ~{' '}
            {formatNumToWon(currentValues[1])}
          </Text>
          <Spacer flex="1" />
          <Text>지역</Text>
          <Stack direction="row">
            {spaceList.map((spaceKey) => (
              <SpaceTag
                key={spaceKey}
                spaceKey={spaceKey}
                isSelected={checkedFilters.includes(spaceKey)}
                onToggleSpace={onToggleSpace}
              />
            ))}
          </Stack>
        </VStack>
        <Button
          p="1"
          w="60px"
          alignSelf={'flex-end'}
          background="#789BFB"
          color="white"
          onClick={applyFilter}
        >
          적용
        </Button>
      </VStack>
    </Box>
  );
};

export default FilterList;
