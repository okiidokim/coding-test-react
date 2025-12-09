// --- 데이터 타입 정의 ---
export interface User {
  id: number;
  name: string;
  age: number;
  isActive: boolean;
  department: string;
  tags?: string[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

export interface Order {
  id: number;
  userId: number;
  products: { productId: number; quantity: number }[];
  orderDate: string;
}

export interface CategorySummary {
  [category: string]: {
    totalPrice: number;
  };
}

export interface DepartmentSummary {
  [department: string]: {
    userCount: number;
    averageAge: number;
  };
}

export interface PaginatedResult<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

// 문제 1: 활성 사용자 필터링
export const filterActiveUsers = (users: User[]): User[] => {
  const activeUsers: User[] = users.filter((prev) => prev.isActive === true);
  return activeUsers;
};

// 문제 2: ID로 사용자 찾기
export const findUserById = (users: User[], id: number): User | undefined => {
  const user: User | undefined = users.find((user) => user.id === id);
  return user;
};

// 문제 3: 사용자 이름을 ID 맵으로 변환
export const createUserMap = (users: User[]): { [id: number]: string } => {
  const userMap = users.reduce((newArr: { [id: number]: string }, curr) => {
    newArr[curr.id] = curr.name;
    return newArr;
  }, {});
  return userMap;
};

// 문제 4: 키를 기준으로 배열 정렬
export const sortArrayByKey = <T>(
  array: T[],
  key: keyof T,
  order: 'asc' | 'desc'
): T[] => {
  const newArr: T[] = array.sort((a: T, b: T) => {
    if (order === 'asc') {
      if (a[key] > b[key]) return 1;
      else return -1;
    } else {
      if (a[key] < b[key]) return 1;
      else return -1;
    }
  });
  return newArr;
};

// 문제 5: 페이지네이션 구현
export const paginate = <T>(
  array: T[],
  page: number,
  pageSize: number
): PaginatedResult<T> => {
  return {
    items: array.slice(page, page + pageSize),
    totalItems: array.length,
    totalPages: array.length / pageSize,
    currentPage: page,
  };
};

// 문제 6: 계산된 속성 추가 (age 가 20 이상을 adult 로 간주합니다)
export const addIsAdultProperty = (
  users: User[]
): (User & { isAdult: boolean })[] => {
  const usersWithAdult = users.map((user) => {
    const isAdult = user.age >= 20 ? true : false;
    return { ...user, isAdult };
  });
  return usersWithAdult;
};

// 문제 7: 카테고리별 상품 총액 계산
export const getCategoryTotals = (products: Product[]): CategorySummary => {
  const pricesByCategory = products.reduce((newArr: CategorySummary, curr) => {
    if (!newArr[curr.category])
      newArr[curr.category] = { totalPrice: curr.price };
    else newArr[curr.category].totalPrice += curr.price;
    return newArr;
  }, {});
  return pricesByCategory;
};

// 문제 8: 두 사용자 배열 병합 및 중복 제거 (중복이 있는 경우 users2 내의 사용자를 사용합니다)
export const mergeAndDeduplicateUsers = (
  users1: User[],
  users2: User[]
): User[] => {
  const map = new Map();
  users1.forEach((user) => map.set(user.id, user));
  users2.forEach((user) => map.set(user.id, user));
  return [...map.values()];
};

// 문제 9: 특정 태그를 가진 사용자 찾기
export const findUsersByTag = (users: User[], tag: string): User[] => {
  const taggedUsers: User[] = users.filter((user) => {
    if (user.tags !== undefined) {
      if (user.tags.includes(tag)) return user;
    }
  });
  return taggedUsers;
};

// 문제 10: 부서별 사용자 통계 집계
export const getDepartmentSummary = (users: User[]): DepartmentSummary => {
  const departmentStats = users.reduce((newArr: DepartmentSummary, curr) => {
    if (!newArr[curr.department]) {
      newArr[curr.department] = {
        userCount: 1,
        averageAge: curr.age,
      };
    } else {
      const age = newArr[curr.department].averageAge;
      const userCnt = newArr[curr.department].userCount;
      newArr[curr.department].userCount += 1;
      newArr[curr.department].averageAge =
        (age * userCnt + curr.age) / (userCnt + 1);
    }
    return newArr;
  }, {});
  return departmentStats;
};
