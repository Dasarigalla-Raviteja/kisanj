import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle,
  AlertTriangle,
  Clock,
  Target,
  TrendingUp,
  Store,
  MapPin,
  Plus,
  Leaf,
  Calendar,
  Award,
  ShoppingCart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';

interface DiagnosisResult {
  disease: string;
  confidence: number;
  affectedArea: string;
  stage: string;
  severity: 'low' | 'medium' | 'high';
  detectedDate: string;
}

const DiagnoseResults = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<DiagnosisResult | null>(null);
  const [plantImage, setPlantImage] = useState<string | null>(null);

  useEffect(() => {
    const savedResults = localStorage.getItem('diagnosis_results');
    const savedImage = localStorage.getItem('plant_image');
    
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    }
    if (savedImage) {
      setPlantImage(savedImage);
    }
  }, []);

  const addToActiveTreatments = () => {
    if (results) {
      const treatment = {
        id: Date.now().toString(),
        disease: results.disease,
        startDate: new Date().toISOString(),
        status: 'active',
        progress: 0,
        nextAction: 'Remove affected parts and apply copper fungicide',
        image: plantImage,
        severity: results.severity,
        confidence: results.confidence,
        steps: [
          { step: 1, title: 'Remove Affected Parts', completed: false, dueDate: new Date().toISOString() },
          { step: 2, title: 'Apply Copper Fungicide', completed: false, dueDate: new Date(Date.now() + 24*60*60*1000).toISOString() },
          { step: 3, title: 'Improve Air Circulation', completed: false, dueDate: new Date(Date.now() + 2*24*60*60*1000).toISOString() },
          { step: 4, title: 'Monitor Progress', completed: false, dueDate: new Date(Date.now() + 7*24*60*60*1000).toISOString() }
        ]
      };
      
      const existingTreatments = JSON.parse(localStorage.getItem('active_treatments') || '[]');
      existingTreatments.push(treatment);
      localStorage.setItem('active_treatments', JSON.stringify(existingTreatments));
      
      toast({
        title: "✅ Treatment Saved!",
        description: "Added to your active treatments with step-by-step guidance."
      });
      
      // Navigate to treatments after a brief delay
      setTimeout(() => {
        navigate('/treatments');
      }, 1500);
    }
  };

  const handleFertilizerRecommendation = (fertilizerName: string) => {
    // Store fertilizer search query and navigate to shop
    localStorage.setItem('fertilizer_search', fertilizerName);
    navigate('/shop?search=' + encodeURIComponent(fertilizerName));
  };

  if (!results) {
    return (
      <div className="mobile-container">
        <div className="mobile-content flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <AlertTriangle className="w-16 h-16 text-agri-warning mx-auto mb-4" />
            <h2 className="text-xl font-bold text-agri-accent mb-2">No Results Found</h2>
            <p className="text-agri-gray mb-4">Please diagnose a plant first.</p>
            <Button onClick={() => navigate('/diagnose')}>
              Start Diagnosis
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const recommendedFertilizers = [
    { name: 'Copper Fungicide Spray', price: '₹450', inStock: true },
    { name: 'Blight Control Solution', price: '₹320', inStock: true },
    { name: 'Organic Plant Immunity Booster', price: '₹280', inStock: false }
  ];

  return (
    <div className="mobile-container">
      {/* Header */}
      <div className="mobile-header bg-agri-cream">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('/diagnose')}
            className="p-2 hover:bg-agri-light rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-agri-accent" />
          </button>
          <h1 className="text-xl font-bold text-agri-accent">Diagnosis Results</h1>
        </div>
      </div>

      <div className="mobile-content space-y-6 pt-4">
        {/* Success Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-agri-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-agri-success animate-bounce" />
          </div>
          <h1 className="text-2xl font-bold text-agri-accent mb-2">Diagnosis Complete</h1>
          <p className="text-agri-gray">
            Analyzed on {new Date(results.detectedDate).toLocaleDateString()}
          </p>
        </div>

        {/* Plant Image */}
        {plantImage && (
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
            <img 
              src={plantImage} 
              alt="Diagnosed plant" 
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute top-4 right-4 bg-green-500 rounded-full p-3 shadow-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div className="absolute bottom-4 left-4 text-white">
              <div className="text-sm font-medium opacity-90">Analyzed Image</div>
              <div className="text-xs opacity-70">{new Date().toLocaleDateString()}</div>
            </div>
          </div>
        )}

        {/* Disease Detection */}
        <div className="plant-card border-l-4 border-red-500">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-red-700 mb-2">{results.disease}</h2>
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center space-x-2">
                  <Progress value={results.confidence} className="w-20 h-2" />
                  <span className="text-sm font-medium text-red-600">{results.confidence}% Match</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(results.severity)}`}>
                  {results.severity.toUpperCase()}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-agri-accent">Affected Area:</span>
                  <p className="text-agri-gray">{results.affectedArea}</p>
                </div>
                <div>
                  <span className="font-medium text-agri-accent">Stage:</span>
                  <p className="text-agri-gray">{results.stage}</p>
                </div>
              </div>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        {/* Treatment Timeline */}
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="w-6 h-6 text-blue-600" />
            <h3 className="font-bold text-blue-900">Treatment Timeline</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-blue-800">Recovery Duration:</span>
              <span className="font-semibold text-blue-900">14-21 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-800">Success Rate:</span>
              <span className="font-semibold text-agri-success">92% farmers recovered</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-800">Best Treatment Time:</span>
              <span className="font-semibold text-blue-900">Early morning</span>
            </div>
          </div>
          
          <Progress value={92} className="w-full h-2 mt-4" />
        </div>

        {/* Treatment Steps */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-6 border border-green-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-green-500 rounded-full p-3">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Treatment Steps</h3>
              <p className="text-sm text-gray-600">Follow these steps for best results</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-white rounded-2xl shadow-sm">
              <div className="bg-green-500 text-white rounded-full p-2 text-sm font-bold flex-shrink-0">1</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Remove Affected Parts</h4>
                <p className="text-sm text-gray-600">Carefully remove all affected leaves and stems. Dispose away from healthy plants.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-white rounded-2xl shadow-sm">
              <div className="bg-blue-500 text-white rounded-full p-2 text-sm font-bold flex-shrink-0">2</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Apply Copper Fungicide</h4>
                <p className="text-sm text-gray-600">Spray in early morning or evening. Repeat every 7-10 days for 3 applications.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-white rounded-2xl shadow-sm">
              <div className="bg-purple-500 text-white rounded-full p-2 text-sm font-bold flex-shrink-0">3</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Improve Air Circulation</h4>
                <p className="text-sm text-gray-600">Space plants properly and avoid overhead watering to prevent reinfection.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-white rounded-2xl shadow-sm">
              <div className="bg-orange-500 text-white rounded-full p-2 text-sm font-bold flex-shrink-0">4</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Monitor Progress</h4>
                <p className="text-sm text-gray-600">Check daily for new symptoms. Recovery should begin within 5-7 days.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Add to Active Treatments */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-3xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-white text-lg mb-2">Save Treatment Plan</h3>
              <p className="text-green-100 text-sm">Track progress with daily reminders and monitoring</p>
            </div>
            <Calendar className="w-10 h-10 text-green-200" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div className="bg-white/20 rounded-2xl p-3">
              <div className="font-semibold mb-1">Duration</div>
              <div className="text-green-100">14-21 days</div>
            </div>
            <div className="bg-white/20 rounded-2xl p-3">
              <div className="font-semibold mb-1">Success Rate</div>
              <div className="text-green-100">92% recovery</div>
            </div>
          </div>
          
          <Button 
            onClick={addToActiveTreatments}
            className="w-full bg-white text-green-600 hover:bg-green-50 font-semibold py-3 rounded-2xl transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            Save to My Treatments
          </Button>
        </div>

        {/* Fertilizer Recommendations */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-agri-accent">Recommended Fertilizers</h2>
          
          {recommendedFertilizers.map((fertilizer, index) => (
            <div key={index} className="plant-card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-agri-accent">{fertilizer.name}</h3>
                  <p className="text-lg font-bold text-agri-primary">{fertilizer.price}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    fertilizer.inStock ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {fertilizer.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
              
              <Button 
                onClick={() => handleFertilizerRecommendation(fertilizer.name)}
                disabled={!fertilizer.inStock}
                className="w-full"
                variant={fertilizer.inStock ? "default" : "outline"}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {fertilizer.inStock ? 'Order Now' : 'Check Alternatives'}
              </Button>
            </div>
          ))}
        </div>

        {/* Alternative Options */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-agri-accent">Alternative Options</h2>
          
          {/* Nearby Shops */}
          <div className="plant-card bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold mb-2">Visit Nearby Fertilizer Shops</h3>
                <p className="text-white/90 text-sm mb-4">Get directions and contact details</p>
                
                <div className="space-y-1 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>3 shops within 5km</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>GPS navigation available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Expert advice included</span>
                  </div>
                </div>
              </div>
              <MapPin className="w-8 h-8 opacity-80" />
            </div>
            
            <Button 
              onClick={() => navigate('/nearby-shops')}
              className="w-full bg-white text-purple-600 hover:bg-white/90 font-semibold"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Find Nearest Shops
            </Button>
          </div>

          {/* Expert Consultation */}
          <div className="plant-card bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold mb-2">Consult Agricultural Expert</h3>
                <p className="text-white/90 text-sm mb-4">Get personalized advice from experts</p>
                
                <div className="space-y-1 text-sm">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4" />
                    <span>Certified agricultural experts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Video consultation available</span>
                  </div>
                </div>
              </div>
              <Award className="w-8 h-8 opacity-80" />
            </div>
            
            <Button 
              className="w-full bg-white text-orange-600 hover:bg-white/90 font-semibold"
            >
              <Award className="w-4 h-4 mr-2" />
              Book Consultation
            </Button>
          </div>
        </div>

        {/* Action Summary */}
        <div className="bg-agri-cream rounded-xl p-4 border border-agri-primary/20">
          <h3 className="font-semibold text-agri-accent mb-2">Next Steps Summary:</h3>
          <ol className="space-y-1 text-sm text-agri-gray">
            <li>1. Add to active treatments for monitoring</li>
            <li>2. Order recommended fertilizers</li>
            <li>3. Apply treatment in early morning</li>
            <li>4. Monitor progress daily</li>
            <li>5. Expect recovery in 14-21 days</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DiagnoseResults;