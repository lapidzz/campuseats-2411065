export const vendors = [
  {
    id: 'my-restaurant',
    name: 'Kafe Top Global',
    location: 'Mahallah Ali, Mahallah Office Park',
    openHours: '7:00 am - 10:00 pm',
    isOpen: true,
    menu: [
      { id: 'my-1', name: 'Nasi Lemak', description: 'Nasi kukus with pandan, egg, peanut & anchovies, fried chicken, cucumber', price: 7.5, category: 'Rice', available: true, special: true },
      { id: 'my-2', name: 'Ayam Gepuk', description: 'Rice with Fried Chicken, special gepuk sauce', price: 6, category: 'Rice', available: true, special: false },
      { id: 'my-3', name: 'Teh Ais', description: 'Tea with condence milk', price: 2.5, category: 'Drinks', available: true, special: false },
    ],
  },
  {
    id: 'kafe-aminah',
    name: 'Kafe Mahallah Aminah',
    location: 'Mahallah Aminah, Ground Floor',
    openHours: '8:00 am - 9:00 pm',
    isOpen: true,
    menu: [
      { id: 'ami-1', name: 'Nasi Ayam Penyet', description: 'Smashed fried chicken with sambal and rice', price: 9, category: 'Rice', available: true, special: true },
      { id: 'ami-2', name: 'Air Bandung', description: 'Rose syrup with milk', price: 3, category: 'Drinks', available: true, special: false },
    ],
  },
  {
    id: 'kafe-faruq',
    name: 'Kafe Faruq',
    location: 'Mahallah Faruq, Ground Floor',
    openHours: '7:00 am - 10:00 pm',
    isOpen: true,
    menu: [
      { id: 'far-1', name: 'Mee Kari', description: 'Mee with special curry soup', price: 8, category: 'Rice', available: true, special: false },
      { id: 'far-2', name: 'Sizzling Grill', description: 'Sizzling mee with chicken grill', price: 5.5, category: 'Mee', available: true, special: true },
      { id: 'far-3', name: 'Teh O Ais', description: 'Tea ice', price: 2.5, category: 'Drinks', available: true, special: false },
    ],
  },
  {
    id: 'kafe bilal',
    name: 'Kafe Bilal',
    location: 'Mahallah Bilal, Mahallah Office Park',
    openHours: '7:00 am - 10:00 pm',
    isOpen: true,
    menu: [
      { id: 'bil-1', name: 'Fried Rice', description: 'Fried rice with egg', price: 6, category: 'Rice', available: true, special: false },
      { id: 'bil-2', name: 'Chicken Chop', description: 'Grilled chicken chop', price: 9, category: 'Rice', available: false, special: true },
      { id: 'bil-3', name: 'Longan', description: 'Cats eye fruit drink', price: 3, category: 'Drinks', available: true, special: false },
    ],
  },
]


export default vendors