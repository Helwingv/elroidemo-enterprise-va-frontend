import { X, Users, Clock, Tag } from 'lucide-react';

interface MarketplaceItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    partners: number;
    duration: string;
    image: string;
  };
  onPurchase: (itemId: string) => void;
}

export default function MarketplaceItemModal({ isOpen, onClose, item, onPurchase }: MarketplaceItemModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg bg-white rounded-xl shadow-xl z-50 max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-sm text-gray-600">{item.category}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="space-y-6">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-lg"
            />

            <div>
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Tag className="h-5 w-5 mx-auto text-blue-600 mb-2" />
                <div className="text-lg font-semibold">${item.price}</div>
                <div className="text-sm text-gray-500">Price</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Users className="h-5 w-5 mx-auto text-blue-600 mb-2" />
                <div className="text-lg font-semibold">{item.partners}</div>
                <div className="text-sm text-gray-500">Partners</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Clock className="h-5 w-5 mx-auto text-blue-600 mb-2" />
                <div className="text-lg font-semibold">{item.duration}</div>
                <div className="text-sm text-gray-500">Duration</div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Health Data Package Includes:</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• HIPAA-compliant data access</li>
                <li>• Secure data transmission protocols</li>
                <li>• Healthcare analytics dashboard</li>
                <li>• Compliance documentation</li>
                <li>• Expert medical support</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Terms & Conditions</h3>
              <p className="text-sm text-gray-600">
                By purchasing this health data package, you agree to comply with HIPAA regulations
                and our healthcare data sharing policies. Subscription will automatically renew
                unless cancelled. All data usage must follow medical privacy guidelines.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Total Price</p>
              <p className="text-2xl font-bold">${item.price}</p>
            </div>
            <button
              onClick={() => {
                onPurchase(item.id);
                onClose();
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Complete Purchase
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Secure payment processing. Cancel anytime.
          </p>
        </div>
      </div>
    </>
  );
}