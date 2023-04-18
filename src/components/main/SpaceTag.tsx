import { ISpaceTagProps } from '@/interface/props';
import { Tag } from '@chakra-ui/react';

const SpaceTag = ({ spaceKey, isSelected, onToggleSpace }: ISpaceTagProps) => {
  return (
    <Tag
      key={spaceKey}
      variant={isSelected ? 'solid' : 'outline'}
      bg={isSelected ? '#FFF1DC' : 'white'}
      color="black"
      onClick={() => onToggleSpace(spaceKey)}
      cursor="pointer"
    >
      {spaceKey}
    </Tag>
  );
};

export default SpaceTag;
