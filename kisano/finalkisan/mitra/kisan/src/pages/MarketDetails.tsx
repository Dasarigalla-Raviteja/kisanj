import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft,
  MapPin,
  TrendingUp, 
  TrendingDown, 
  Bell,
  BellOff,
  Clock,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const MarketDetails = () => {
  const navigate = useNavigate();
  const { marketId } = useParams();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock market data - same as MarketPrices but with complete crop lists
  const marketData = [
    {
      id: 1,
      name: 'Azadpur Mandi',
      location: 'Delhi',
      distance: '12 km',
      crops: [
        { name: 'Tomato', price: '₹16/kg', change: '+8%', trend: 'up', previousPrice: '₹14.80/kg' },
        { name: 'Onion', price: '₹25/kg', change: '+12%', trend: 'up', previousPrice: '₹22.30/kg' },
        { name: 'Potato', price: '₹18/kg', change: '-5%', trend: 'down', previousPrice: '₹19/kg' },
        { name: 'Carrot', price: '₹22/kg', change: '+3%', trend: 'up', previousPrice: '₹21.30/kg' },
        { name: 'Cabbage', price: '₹12/kg', change: '0%', trend: 'stable', previousPrice: '₹12/kg' },
        { name: 'Cauliflower', price: '₹20/kg', change: '+15%', trend: 'up', previousPrice: '₹17.40/kg' },
        { name: 'Spinach', price: '₹18/kg', change: '-2%', trend: 'down', previousPrice: '₹18.40/kg' },
        { name: 'Brinjal', price: '₹24/kg', change: '+7%', trend: 'up', previousPrice: '₹22.40/kg' },
        { name: 'Okra', price: '₹35/kg', change: '+10%', trend: 'up', previousPrice: '₹31.80/kg' },
        { name: 'Green Beans', price: '₹45/kg', change: '-3%', trend: 'down', previousPrice: '₹46.40/kg' }
      ]
    },
    {
      id: 2,
      name: 'Ghazipur Mandi',
      location: 'Delhi',
      distance: '18 km',
      crops: [
        { name: 'Wheat', price: '₹2,150/qtl', change: '+2%', trend: 'up', previousPrice: '₹2,105/qtl' },
        { name: 'Paddy', price: '₹1,850/qtl', change: '-3%', trend: 'down', previousPrice: '₹1,907/qtl' },
        { name: 'Mustard', price: '₹4,200/qtl', change: '+5%', trend: 'up', previousPrice: '₹4,000/qtl' },
        { name: 'Gram', price: '₹3,800/qtl', change: '+1%', trend: 'up', previousPrice: '₹3,762/qtl' },
        { name: 'Barley', price: '₹1,650/qtl', change: '+4%', trend: 'up', previousPrice: '₹1,587/qtl' },
        { name: 'Maize', price: '₹1,420/qtl', change: '-1%', trend: 'down', previousPrice: '₹1,434/qtl' },
        { name: 'Bajra', price: '₹1,380/qtl', change: '+3%', trend: 'up', previousPrice: '₹1,340/qtl' },
        { name: 'Jowar', price: '₹1,250/qtl', change: '+2%', trend: 'up', previousPrice: '₹1,225/qtl' }
      ]
    },
    {
      id: 3,
      name: 'Najafgarh Mandi',
      location: 'Delhi',
      distance: '25 km',
      crops: [
        { name: 'Cauliflower', price: '₹15/kg', change: '+10%', trend: 'up', previousPrice: '₹13.60/kg' },
        { name: 'Peas', price: '₹35/kg', change: '-8%', trend: 'down', previousPrice: '₹38/kg' },
        { name: 'Spinach', price: '₹20/kg', change: '+15%', trend: 'up', previousPrice: '₹17.40/kg' },
        { name: 'Radish', price: '₹8/kg', change: '+6%', trend: 'up', previousPrice: '₹7.55/kg' },
        { name: 'Lettuce', price: '₹25/kg', change: '+5%', trend: 'up', previousPrice: '₹23.80/kg' },
        { name: 'Coriander', price: '₹40/kg', change: '-10%', trend: 'down', previousPrice: '₹44.40/kg' },
        { name: 'Mint', price: '₹50/kg', change: '+8%', trend: 'up', previousPrice: '₹46.30/kg' },
        { name: 'Fenugreek', price: '₹30/kg', change: '+12%', trend: 'up', previousPrice: '₹26.80/kg' }
      ]
    },
    {
      id: 4,
      name: 'Okhla Mandi',
      location: 'Delhi',
      distance: '22 km',
      crops: [
        { name: 'Apple', price: '₹120/kg', change: '+5%', trend: 'up', previousPrice: '₹114.30/kg' },
        { name: 'Orange', price: '₹60/kg', change: '-2%', trend: 'down', previousPrice: '₹61.20/kg' },
        { name: 'Banana', price: '₹40/kg', change: '+8%', trend: 'up', previousPrice: '₹37.00/kg' },
        { name: 'Grapes', price: '₹80/kg', change: '+3%', trend: 'up', previousPrice: '₹77.70/kg' },
        { name: 'Pomegranate', price: '₹150/kg', change: '+7%', trend: 'up', previousPrice: '₹140.20/kg' },
        { name: 'Mango', price: '₹90/kg', change: '-5%', trend: 'down', previousPrice: '₹94.70/kg' },
        { name: 'Guava', price: '₹45/kg', change: '+10%', trend: 'up', previousPrice: '₹40.90/kg' },
        { name: 'Papaya', price: '₹25/kg', change: '+4%', trend: 'up', previousPrice: '₹24.00/kg' }
      ]
    }
  ];

  const market = marketData.find(m => m.id === parseInt(marketId || '1'));

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4" />;
      case 'down':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <div className="w-4 h-4 rounded-full bg-gray-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleRefresh = () => {
    setLastUpdated(new Date());
  };

  if (!market) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-600 mb-2">Market not found</h3>
          <Button onClick={() => navigate('/market-prices')}>
            Back to Markets
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-green-600 p-2"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Button>
            <div className="flex-1 text-center">
              <h1 className="text-xl font-bold text-gray-900">{market.name}</h1>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{market.location} • {market.distance}</span>
                <span>•</span>
                <Clock className="w-4 h-4" />
                <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRefresh}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <RefreshCw className="w-4 h-4 text-green-600" />
                </Button>
              </div>
            </div>
          </div>

          {/* Notification Toggle */}
          <div className="flex items-center justify-center mt-4 bg-gray-50 rounded-xl p-3">
            <div className="flex items-center space-x-3">
              {notificationsEnabled ? (
                <Bell className="w-5 h-5 text-blue-600" />
              ) : (
                <BellOff className="w-5 h-5 text-gray-400" />
              )}
              <span className="text-sm font-medium text-gray-700">
                Price Notifications
              </span>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
              <span className="text-xs text-gray-500">
                {notificationsEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <Card className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-200 p-5">
            <CardTitle className="text-lg font-bold text-gray-900">
              All Crop Prices ({market.crops.length} items)
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <div className="space-y-0">
              {market.crops.map((crop, index) => (
                <div key={index} className="flex items-center justify-between p-5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-base">{crop.name}</h4>
                    <p className="text-sm text-gray-500">Previous: {crop.previousPrice}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-bold text-lg text-gray-900">{crop.price}</div>
                      <div className={`text-sm font-medium flex items-center space-x-1 ${getTrendColor(crop.trend)}`}>
                        {getTrendIcon(crop.trend)}
                        <span>{crop.change}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketDetails;