import ProductList from './components/ProductList';
import SortPanel from './components/SortPanel';
import Statistics from './components/Statistics';
import { ProductProvider } from './context/ProductProvider';

const App = () => {
  console.log("App rendering");

  return (
    <ProductProvider>
      <div className="container mx-auto p-4">
        <header className="bg-blue-50 p-4 mb-6 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold text-blue-800">
            Оптимизация React приложения
          </h1>
          <p className="mt-2 text-gray-600">
            Это приложение намеренно не оптимизировано. Надо наблюдать, как часто компоненты перерисовываются, проверяя логи консоли.
            Ваша задача - оптимизировать с помощью memo, useMemo и useCallback.
          </p>
          <ul className="mt-4 list-disc list-inside text-gray-700 text-sm font-bold">
            <li>Сделать так, чтобы при сортировке перерисовывались только ProductList и Statistics (с учетом мемоизации вычисления статистики).</li>
            <li>Сделать так, чтобы при изменении количества или цены перерисовывались только Statistics, ProductList и конкретный Product.</li>
            <li>Мемоизировать компоненты, которые не должны перерисовываться.</li>
            <li>Использовать useMemo для вычисления статистики.</li>
            <li>Попробовать разные способы оптимизации и попрактиковаться</li>
          </ul>

          <p className="mt-4 text-gray-700 font-bold">
            Колечество отображаемых продуктов можно изменить в <code>src/context/ProductProvider.jsx:8</code> максимум 1000.
          </p>
        </header>

        <Statistics />
        <SortPanel />
        <ProductList />
      </div>
    </ProductProvider>
  );
};

export default App;