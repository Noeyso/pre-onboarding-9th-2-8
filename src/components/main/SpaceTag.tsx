import { ISpaceTagProps } from '@/interface/props';
import { Tag } from '@chakra-ui/react';

const SpaceTag = ({ spaceKey, isSelected, onToggleSpace }: ISpaceTagProps) => {
  return (
    <Tag
      key={spaceKey}
      variant={isSelected ? 'outline' : 'solid'}
      bg={isSelected ? '#FFF1DC' : '#EDF2F7'}
      color="black"
      fontWeight={isSelected ? 'bold' : 'medium'}
      padding="10px 20px"
      onClick={() => onToggleSpace(spaceKey)}
      cursor="pointer"
    >
      {spaceKey}
    </Tag>
  );
};

export default SpaceTag;
