export interface ISpaceTagProps {
  spaceKey: string;
  isSelected: boolean;
  onToggleSpace: (key: string) => void;
}

interface IAlertByDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  cartItem: ICartItem;
}

interface ICartItemProps {
  cartItem: ICartItem;
}
