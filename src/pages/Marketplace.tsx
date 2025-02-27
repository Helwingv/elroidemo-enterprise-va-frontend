import { Store, Tag, Users, Clock } from 'lucide-react';
import { useState } from 'react';
import MarketplaceItemModal from '../components/MarketplaceItemModal';
import ListDataModal from '../components/ListDataModal';

interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  partners: number;
  duration: string;
  image: string;
}

const marketplaceItems: MarketplaceItem[] = [
  {
    id: '1',
    title: 'Health Analytics Premium',
    description: 'Comprehensive health analytics including vitals, fitness metrics, and wellness trends',
    price: 45,
    category: 'Health Analytics',
    partners: 5,
    duration: '3 months',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '2',
    title: 'Fitness Performance Bundle',
    description: 'Track and analyze your fitness performance, workouts, and progress metrics',
    price: 35,
    category: 'Fitness',
    partners: 3,
    duration: '1 month',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '3',
    title: 'Medical Research Dataset',
    description: 'Anonymized medical research data for healthcare professionals and researchers',
    price: 75,
    category: 'Research',
    partners: 7,
    duration: '6 months',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400',
  },
];

export default function Marketplace() {
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [items, setItems] = useState<MarketplaceItem[]>(marketplaceItems);

  const handlePurchase = (itemId: string) => {
    // Handle the purchase logic here
    console.log('Purchasing item:', itemId);
  };

  const handleListData = (data: {
    title: string;
    description: string;
    price: number;
    category: string;
    duration: string;
    image: string;
  }) => {
    const newItem: MarketplaceItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: data.title,
      description: data.description,
      price: data.price,
      category: data.category,
      partners: 0,
      duration: data.duration,
      image: data.image
    };

    setItems(prev => [newItem, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Data Marketplace</h1>
        <div className="flex space-x-4">
          <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm">
            <option>All Categories</option>
            <option>Gaming</option>
            <option>Entertainment</option>
            <option>Analytics</option>
          </select>
          <button 
            onClick={() => setIsListModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            List Your Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all"
          >
            <div className="relative h-48">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-black/75 text-white">
                  ${item.price}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {item.category}
                </span>
              </div>

              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{item.partners} Partners</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{item.duration}</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  setSelectedItem(item);
                  setIsModalOpen(true);
                }}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Purchase Access
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedItem && (
        <MarketplaceItemModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          item={selectedItem}
          onPurchase={handlePurchase}
        />
      )}
      <ListDataModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        onSubmit={handleListData}
      />
    </div>
  );
}