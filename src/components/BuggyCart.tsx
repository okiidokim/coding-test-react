import React, { useState, useMemo } from 'react';
import styles from './BuggyCart.module.css';

/**
 * ## 과제 4: 버그 수정 (고급)
 *
 * 이 컴포넌트는 버그를 포함하고 있습니다.
 *
 * ### 현재 버그 시나리오:
 * 1. 각 상품의 '+' 버튼을 클릭하여 수량을 늘려도, 하단의 '총가격'이 즉시 업데이트되지 않습니다.
 * 2. 다른 탭으로 이동후 돌아오면 비로소 이전 변경사항이 늦게 반영됩니다.
 *
 * ### 요구사항:
 * - `handleIncreaseQuantity` 함수를 수정하여 '+' 버튼 클릭 시 '총가격'이 즉시 정확하게 업데이트되도록 만드세요.
 */

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const initialItems: CartItem[] = [
  { id: 1, name: 'React 후드티', price: 35000, quantity: 1 },
  { id: 2, name: 'TypeScript 티셔츠', price: 28000, quantity: 2 },
  { id: 3, name: 'Vite 머그컵', price: 15000, quantity: 1 },
];

const BuggyCart: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  // 버그가 있는 Handler
  const handleIncreaseQuantity = (itemId: number) => {
    setItems((prev) => {
      const newItems = prev.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      );
      return newItems;
    });
  };

  const totalPrice = useMemo(() => {
    console.log('총가격을 다시 계산합니다...');
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  return (
    <div className={styles.container}>
      <h2>과제 4: 버그 수정하기</h2>
      <div className={styles.description}>
        <p>
          <code>BuggyCart.tsx</code>의 <code>handleIncreaseQuantity</code>{' '}
          함수를 수정하여,
          <br />
          수량 변경 시 총가격이 즉시 업데이트되도록 만드세요.
        </p>
      </div>
      <ul className={styles.itemList}>
        {items.map((item) => (
          <li key={item.id} className={styles.item}>
            <span className={styles.itemName}>{item.name}</span>
            <span className={styles.itemPrice}>
              {item.price.toLocaleString()}원
            </span>
            <div className={styles.quantityControl}>
              <span>수량: {item.quantity}</span>
              <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.totalPrice}>
        총가격: {totalPrice.toLocaleString()}원
      </div>
    </div>
  );
};

export default BuggyCart;
