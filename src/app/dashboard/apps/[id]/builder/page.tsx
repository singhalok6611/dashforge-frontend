'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import api from '@/lib/api';
import {
  ArrowLeft,
  Table as TableIcon,
  BarChart3,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Activity,
  Code,
  Loader2,
  Plus,
  CreditCard,
  TrendingUp,
  Trash2,
  List,
  FileText,
  FormInput,
  Image as ImageIcon,
  Square,
  Gauge,
  Target,
  GitCommit,
  Radar,
  Hash,
  ArrowUpCircle,
  ArrowDownCircle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  RadarChart,
  Radar as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

interface Query {
  id: string;
  name: string;
  queryType: string;
  dataSource: {
    name: string;
    type: string;
  };
}

interface Component {
  id: string;
  type: 'table' | 'chart' | 'lineChart' | 'pieChart' | 'areaChart' | 'donutChart' | 'gauge' | 'scatterChart' | 'radarChart' | 'metricCard' | 'card' | 'stat' | 'kpi' | 'progress' | 'list' | 'text' | 'form' | 'button';
  queryId: string | null;
  queryName?: string;
  data?: any;
  config?: any;
}

export default function BuilderPage() {
  const params = useParams();
  const router = useRouter();
  const appId = params.id as string;

  const [queries, setQueries] = useState<Query[]>([]);
  const [loadingQueries, setLoadingQueries] = useState(true);
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [bindingQuery, setBindingQuery] = useState(false);

  useEffect(() => {
    fetchQueries();
    loadLayout();
  }, [appId]);

  const loadLayout = async () => {
    try {
      const response = await api.get(`/apps/${appId}/layout`);

      const data = response.data;
      if (data.success && data.data.layout) {
        const loadedComponents = data.data.layout;

        // Re-execute queries for components that have a queryId to get fresh data
        const componentsWithData = await Promise.all(
          loadedComponents.map(async (comp: Component) => {
            if (comp.queryId) {
              try {
                const queryResponse = await api.post(
                  `/apps/${appId}/queries/${comp.queryId}/execute`,
                  { parameters: {} }
                );

                const result = queryResponse.data;
                if (result.success) {
                  return {
                    ...comp,
                    data: result.data.data,
                  };
                }
              } catch (err) {
                console.error('Error re-executing query:', err);
              }
            }
            return comp;
          })
        );

        setComponents(componentsWithData);
      }
    } catch (err) {
      console.error('Error loading layout:', err);
    }
  };

  const saveLayout = async () => {
    setSaving(true);
    console.log('Saving layout with components:', components);

    // Remove the data property before saving (we'll re-execute queries on load)
    // This prevents issues with large data or circular references
    const componentsToSave = components.map(({ data, ...comp }) => comp);
    console.log('Components to save (without data):', componentsToSave);

    try {
      const response = await api.put(`/apps/${appId}/layout`, { layout: componentsToSave });

      const data = response.data;
      console.log('Save response:', data);

      if (data.success) {
        console.log('Layout saved successfully, redirecting...');
        // Redirect to app preview page after successful save
        router.push(`/dashboard/apps/${appId}`);
      } else {
        console.error('Save failed:', data);
        alert('Failed to save layout: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error saving layout:', err);
      alert('Failed to save layout');
    } finally {
      setSaving(false);
    }
  };

  const fetchQueries = async () => {
    try {
      setLoadingQueries(true);
      const response = await api.get(`/apps/${appId}/queries`);

      const data = response.data;
      if (data.success) {
        setQueries(data.data);
      }
    } catch (err) {
      console.error('Error fetching queries:', err);
    } finally {
      setLoadingQueries(false);
    }
  };

  const addComponent = (type: 'table' | 'chart' | 'lineChart' | 'pieChart' | 'areaChart' | 'donutChart' | 'gauge' | 'scatterChart' | 'radarChart' | 'metricCard' | 'card' | 'stat' | 'kpi' | 'progress' | 'list' | 'text' | 'form' | 'button') => {
    const newComponent: Component = {
      id: `component-${Date.now()}`,
      type,
      queryId: null,
      config: type === 'text' ? { content: 'Edit this text...' } : {},
    };
    setComponents([...components, newComponent]);
    setSelectedComponent(newComponent.id);
  };

  const removeComponent = (id: string) => {
    setComponents(components.filter(c => c.id !== id));
    if (selectedComponent === id) {
      setSelectedComponent(null);
    }
  };

  const bindQueryToComponent = async (componentId: string, queryId: string) => {
    console.log('Binding query', queryId, 'to component', componentId);
    setBindingQuery(true);
    try {
      const response = await api.post(
        `/apps/${appId}/queries/${queryId}/execute`,
        { parameters: {} }
      );

      const result = response.data;
      console.log('Query result:', result);

      if (result.success) {
        const updatedComponents = components.map((comp) =>
          comp.id === componentId
            ? {
                ...comp,
                queryId,
                queryName: queries.find((q) => q.id === queryId)?.name,
                data: result.data.data,
              }
            : comp
        );
        console.log('Updated components:', updatedComponents);
        setComponents(updatedComponents);
      } else {
        console.error('Query execution failed:', result);
        alert('Failed to execute query: ' + (result.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error executing query:', err);
      alert('Error binding query to component');
    } finally {
      setBindingQuery(false);
    }
  };

  const renderComponent = (component: Component) => {
    if (!component.data) {
      return (
        <div className="p-6 text-center text-gray-500">
          No query bound - select a query from sidebar
        </div>
      );
    }

    const data = component.data;

    switch (component.type) {
      case 'table':
        if (!Array.isArray(data) || data.length === 0) {
          return <div className="p-6 text-center text-gray-500">No data available</div>;
        }
        const columns = Object.keys(data[0]);
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((col) => (
                    <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.slice(0, 10).map((row: any, idx: number) => (
                  <tr key={idx}>
                    {columns.map((col) => (
                      <td key={col} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {String(row[col])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {data.length > 10 && (
              <div className="p-4 text-center text-sm text-gray-500">
                Showing 10 of {data.length} rows
              </div>
            )}
          </div>
        );

      case 'stat':
        const count = Array.isArray(data) ? data.length : 0;
        return (
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-600">{count}</div>
            <div className="text-sm text-gray-500 mt-1">Total Records</div>
          </div>
        );

      case 'card':
        const firstRow = Array.isArray(data) && data.length > 0 ? data[0] : null;
        if (!firstRow) {
          return <div className="p-6 text-center text-gray-500">No data</div>;
        }
        return (
          <div className="p-6">
            {Object.entries(firstRow).map(([key, value]) => (
              <div key={key} className="mb-3">
                <div className="text-xs text-gray-500 uppercase">{key}</div>
                <div className="text-sm font-medium text-gray-900">{String(value)}</div>
              </div>
            ))}
          </div>
        );

      case 'chart':
        if (!Array.isArray(data) || data.length === 0) {
          return <div className="p-6 text-center text-gray-500">No data for chart</div>;
        }

        // Try to find numeric columns for chart
        const firstItem = data[0];
        const numericColumns = Object.keys(firstItem).filter(key => {
          const value = firstItem[key];
          return typeof value === 'number' || !isNaN(Number(value));
        });

        const labelColumn = Object.keys(firstItem).find(key =>
          typeof firstItem[key] === 'string'
        ) || Object.keys(firstItem)[0];

        const chartData = data.slice(0, 10).map(item => ({
          name: String(item[labelColumn] || 'N/A'),
          value: numericColumns.length > 0 ? Number(item[numericColumns[0]]) : 1,
        }));

        return (
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'lineChart':
        if (!Array.isArray(data) || data.length === 0) {
          return <div className="p-6 text-center text-gray-500">No data for line chart</div>;
        }

        const lineFirstItem = data[0];
        const lineNumericCols = Object.keys(lineFirstItem).filter(key => {
          const value = lineFirstItem[key];
          return typeof value === 'number' || !isNaN(Number(value));
        });

        const lineLabelCol = Object.keys(lineFirstItem).find(key =>
          typeof lineFirstItem[key] === 'string'
        ) || Object.keys(lineFirstItem)[0];

        const lineChartData = data.slice(0, 20).map(item => ({
          name: String(item[lineLabelCol] || 'N/A'),
          value: lineNumericCols.length > 0 ? Number(item[lineNumericCols[0]]) : 1,
        }));

        return (
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );

      case 'pieChart':
        if (!Array.isArray(data) || data.length === 0) {
          return <div className="p-6 text-center text-gray-500">No data for pie chart</div>;
        }

        const pieFirstItem = data[0];
        const pieNumericCols = Object.keys(pieFirstItem).filter(key => {
          const value = pieFirstItem[key];
          return typeof value === 'number' || !isNaN(Number(value));
        });

        const pieLabelCol = Object.keys(pieFirstItem).find(key =>
          typeof pieFirstItem[key] === 'string'
        ) || Object.keys(pieFirstItem)[0];

        const pieChartData = data.slice(0, 8).map(item => ({
          name: String(item[pieLabelCol] || 'N/A'),
          value: pieNumericCols.length > 0 ? Number(item[pieNumericCols[0]]) : 1,
        }));

        const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#6366f1', '#f43f5e'];

        return (
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );

      case 'areaChart':
        if (!Array.isArray(data) || data.length === 0) {
          return <div className="p-6 text-center text-gray-500">No data for area chart</div>;
        }

        const areaFirstItem = data[0];
        const areaNumericCols = Object.keys(areaFirstItem).filter(key => {
          const value = areaFirstItem[key];
          return typeof value === 'number' || !isNaN(Number(value));
        });

        const areaLabelCol = Object.keys(areaFirstItem).find(key =>
          typeof areaFirstItem[key] === 'string'
        ) || Object.keys(areaFirstItem)[0];

        const areaChartData = data.slice(0, 20).map(item => ({
          name: String(item[areaLabelCol] || 'N/A'),
          value: areaNumericCols.length > 0 ? Number(item[areaNumericCols[0]]) : 1,
        }));

        return (
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={areaChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );

      case 'donutChart':
        if (!Array.isArray(data) || data.length === 0) {
          return <div className="p-6 text-center text-gray-500">No data for donut chart</div>;
        }

        const donutFirstItem = data[0];
        const donutNumericCols = Object.keys(donutFirstItem).filter(key => {
          const value = donutFirstItem[key];
          return typeof value === 'number' || !isNaN(Number(value));
        });

        const donutLabelCol = Object.keys(donutFirstItem).find(key =>
          typeof donutFirstItem[key] === 'string'
        ) || Object.keys(donutFirstItem)[0];

        const donutChartData = data.slice(0, 8).map(item => ({
          name: String(item[donutLabelCol] || 'N/A'),
          value: donutNumericCols.length > 0 ? Number(item[donutNumericCols[0]]) : 1,
        }));

        const DONUT_COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#6366f1', '#f43f5e'];

        return (
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={donutChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {donutChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={DONUT_COLORS[index % DONUT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );

      case 'gauge':
        if (!Array.isArray(data) || data.length === 0) {
          return <div className="p-6 text-center text-gray-500">No data for gauge</div>;
        }

        const gaugeFirstItem = data[0];
        const gaugeNumericCol = Object.keys(gaugeFirstItem).find(key => {
          const value = gaugeFirstItem[key];
          return typeof value === 'number' || !isNaN(Number(value));
        });

        const gaugeValue = gaugeNumericCol ? Number(gaugeFirstItem[gaugeNumericCol]) : 50;
        const gaugePercentage = Math.min(Math.max(gaugeValue, 0), 100);
        const gaugeLabel = gaugeNumericCol ? gaugeNumericCol.replace(/_/g, ' ') : 'Value';

        const gaugeData = [
          { name: 'Value', value: gaugePercentage },
          { name: 'Remaining', value: 100 - gaugePercentage }
        ];

        return (
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gaugeData}
                  cx="50%"
                  cy="70%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={80}
                  outerRadius={120}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill="#3b82f6" />
                  <Cell fill="#e5e7eb" />
                </Pie>
                <text
                  x="50%"
                  y="60%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-4xl font-bold fill-gray-900"
                >
                  {gaugePercentage.toFixed(0)}%
                </text>
                <text
                  x="50%"
                  y="70%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-sm fill-gray-500"
                >
                  {gaugeLabel}
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
        );

      case 'scatterChart':
        if (!Array.isArray(data) || data.length === 0) {
          return <div className="p-6 text-center text-gray-500">No data for scatter chart</div>;
        }

        const scatterFirstItem = data[0];
        const scatterNumericCols = Object.keys(scatterFirstItem).filter(key => {
          const value = scatterFirstItem[key];
          return typeof value === 'number' || !isNaN(Number(value));
        });

        const scatterChartData = data.slice(0, 50).map(item => ({
          x: scatterNumericCols.length > 0 ? Number(item[scatterNumericCols[0]]) : Math.random() * 100,
          y: scatterNumericCols.length > 1 ? Number(item[scatterNumericCols[1]]) : Math.random() * 100,
        }));

        return (
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name={scatterNumericCols[0] || 'X'} />
                <YAxis type="number" dataKey="y" name={scatterNumericCols[1] || 'Y'} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter
                  name="Data Points"
                  data={scatterChartData}
                  fill="#ec4899"
                  shape="circle"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        );

      case 'radarChart':
        if (!Array.isArray(data) || data.length === 0) {
          return <div className="p-6 text-center text-gray-500">No data for radar chart</div>;
        }

        const radarFirstItem = data[0];
        const radarNumericCols = Object.keys(radarFirstItem).filter(key => {
          const value = radarFirstItem[key];
          return typeof value === 'number' || !isNaN(Number(value));
        });

        const radarLabelCol = Object.keys(radarFirstItem).find(key =>
          typeof radarFirstItem[key] === 'string'
        ) || Object.keys(radarFirstItem)[0];

        const radarChartData = data.slice(0, 8).map(item => ({
          subject: String(item[radarLabelCol] || 'N/A').substring(0, 15),
          value: radarNumericCols.length > 0 ? Number(item[radarNumericCols[0]]) : 1,
        }));

        return (
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarChartData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} />
                <RechartsRadar
                  name="Value"
                  dataKey="value"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.6}
                />
                <Tooltip />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'metricCard':
        if (!Array.isArray(data) || data.length === 0) {
          return <div className="p-6 text-center text-gray-500">No data for metric card</div>;
        }

        const metricFirstItem = data[0];
        const metricNumericCol = Object.keys(metricFirstItem).find(key => {
          const value = metricFirstItem[key];
          return typeof value === 'number' || !isNaN(Number(value));
        });

        const metricValue = metricNumericCol ? Number(metricFirstItem[metricNumericCol]) : data.length;
        const metricLabel = metricNumericCol ? metricNumericCol.replace(/_/g, ' ') : 'Total';

        // Calculate trend if we have multiple rows
        const trend = data.length > 1 && metricNumericCol ?
          ((Number(data[0][metricNumericCol]) - Number(data[1][metricNumericCol])) / Number(data[1][metricNumericCol])) * 100 :
          Math.random() > 0.5 ? 12.5 : -8.3;

        const isPositive = trend >= 0;

        return (
          <div className="p-8">
            <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl p-8 text-white">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="text-sm font-medium text-blue-100 uppercase tracking-wider mb-2">
                    {metricLabel}
                  </div>
                  <div className="text-5xl font-extrabold mb-4">
                    {metricValue.toLocaleString()}
                  </div>
                  <div className="flex items-center space-x-2">
                    {isPositive ? (
                      <ArrowUpCircle className="w-5 h-5 text-green-300" />
                    ) : (
                      <ArrowDownCircle className="w-5 h-5 text-red-300" />
                    )}
                    <span className={`text-sm font-semibold ${isPositive ? 'text-green-300' : 'text-red-300'}`}>
                      {Math.abs(trend).toFixed(1)}%
                    </span>
                    <span className="text-sm text-blue-100">vs previous</span>
                  </div>
                </div>
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'kpi':
        if (!Array.isArray(data) || data.length === 0) {
          return <div className="p-6 text-center text-gray-500">No data for KPI</div>;
        }

        const kpiFirstItem = data[0];
        const kpiNumericCol = Object.keys(kpiFirstItem).find(key => {
          const value = kpiFirstItem[key];
          return typeof value === 'number' || !isNaN(Number(value));
        });

        const kpiValue = kpiNumericCol ? Number(kpiFirstItem[kpiNumericCol]) : data.length;
        const kpiLabel = kpiNumericCol || 'Count';

        return (
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">
                  {kpiValue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 mt-1">{kpiLabel.replace(/_/g, ' ')}</div>
              </div>
            </div>
          </div>
        );

      case 'progress':
        if (!Array.isArray(data) || data.length === 0) {
          return <div className="p-6 text-center text-gray-500">No data for progress bar</div>;
        }

        const progFirstItem = data[0];
        const progNumericCol = Object.keys(progFirstItem).find(key => {
          const value = progFirstItem[key];
          return typeof value === 'number' || !isNaN(Number(value));
        });

        const progValue = progNumericCol ? Number(progFirstItem[progNumericCol]) : 0;
        const progPercentage = Math.min(Math.max(progValue, 0), 100);

        return (
          <div className="p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">Progress</span>
                <span className="text-gray-900 font-semibold">{progPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
                  style={{ width: `${progPercentage}%` }}
                />
              </div>
            </div>
          </div>
        );

      case 'list':
        if (!Array.isArray(data) || data.length === 0) {
          return <div className="p-6 text-center text-gray-500">No data</div>;
        }
        const displayKey = Object.keys(data[0])[1] || Object.keys(data[0])[0];
        return (
          <div className="p-4">
            <ul className="divide-y divide-gray-200">
              {data.slice(0, 10).map((item, idx) => (
                <li key={idx} className="py-3 flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-sm text-gray-900">{String(item[displayKey])}</span>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'text':
        return (
          <div className="p-6">
            <div className="text-gray-900 text-lg">
              {component.config?.content || 'Edit this text...'}
            </div>
          </div>
        );

      case 'form':
        if (!Array.isArray(data) || data.length === 0) {
          return (
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter email"
                />
              </div>
              <Button variant="primary">Submit</Button>
            </div>
          );
        }
        // Create form based on data structure
        const sampleRow = data[0];
        return (
          <div className="p-6 space-y-4">
            {Object.keys(sampleRow).slice(0, 5).map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {key.replace(/_/g, ' ')}
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder={`Enter ${key}`}
                />
              </div>
            ))}
            <Button variant="primary">Submit</Button>
          </div>
        );

      case 'button':
        return (
          <div className="p-6">
            <Button variant="primary" size="lg">
              Click Me
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={`/dashboard/apps/${appId}/edit`}>
            <ArrowLeft className="w-5 h-5 text-gray-600 hover:text-gray-900" />
          </Link>
          <h1 className="text-lg font-semibold">Visual Builder</h1>
        </div>
        <Button variant="primary" onClick={saveLayout} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Layout'
          )}
        </Button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-80 bg-white border-r overflow-y-auto">
          <div className="p-4 border-b">
            <h2 className="text-sm font-semibold mb-3">Components</h2>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => addComponent('table')}
                className="p-2 border-2 border-dashed rounded-lg hover:border-blue-500 hover:bg-blue-50 flex flex-col items-center space-y-1"
              >
                <TableIcon className="w-4 h-4" />
                <span className="text-xs">Table</span>
              </button>
              <button
                onClick={() => addComponent('chart')}
                className="p-2 border-2 border-dashed rounded-lg hover:border-blue-500 hover:bg-blue-50 flex flex-col items-center space-y-1"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="text-xs">Bar Chart</span>
              </button>
              <button
                onClick={() => addComponent('lineChart')}
                className="p-2 border-2 border-dashed rounded-lg hover:border-purple-500 hover:bg-purple-50 flex flex-col items-center space-y-1"
              >
                <LineChartIcon className="w-4 h-4" />
                <span className="text-xs">Line Chart</span>
              </button>
              <button
                onClick={() => addComponent('pieChart')}
                className="p-2 border-2 border-dashed rounded-lg hover:border-pink-500 hover:bg-pink-50 flex flex-col items-center space-y-1"
              >
                <PieChartIcon className="w-4 h-4" />
                <span className="text-xs">Pie Chart</span>
              </button>
              <button
                onClick={() => addComponent('areaChart')}
                className="p-2 border-2 border-dashed rounded-lg hover:border-green-500 hover:bg-green-50 flex flex-col items-center space-y-1"
              >
                <Activity className="w-4 h-4" />
                <span className="text-xs">Area Chart</span>
              </button>
              <button
                onClick={() => addComponent('donutChart')}
                className="p-2 border-2 border-dashed rounded-lg hover:border-orange-500 hover:bg-orange-50 flex flex-col items-center space-y-1"
              >
                <GitCommit className="w-4 h-4" />
                <span className="text-xs">Donut Chart</span>
              </button>
              <button
                onClick={() => addComponent('gauge')}
                className="p-2 border-2 border-dashed rounded-lg hover:border-cyan-500 hover:bg-cyan-50 flex flex-col items-center space-y-1"
              >
                <Gauge className="w-4 h-4" />
                <span className="text-xs">Gauge</span>
              </button>
              <button
                onClick={() => addComponent('scatterChart')}
                className="p-2 border-2 border-dashed rounded-lg hover:border-pink-500 hover:bg-pink-50 flex flex-col items-center space-y-1"
              >
                <GitCommit className="w-4 h-4" />
                <span className="text-xs">Scatter Chart</span>
              </button>
              <button
                onClick={() => addComponent('radarChart')}
                className="p-2 border-2 border-dashed rounded-lg hover:border-orange-500 hover:bg-orange-50 flex flex-col items-center space-y-1"
              >
                <Radar className="w-4 h-4" />
                <span className="text-xs">Radar Chart</span>
              </button>
              <button
                onClick={() => addComponent('metricCard')}
                className="p-2 border-2 border-dashed rounded-lg hover:border-indigo-500 hover:bg-indigo-50 flex flex-col items-center space-y-1"
              >
                <Hash className="w-4 h-4" />
                <span className="text-xs">Metric Card</span>
              </button>
              <button
                onClick={() => addComponent('kpi')}
                className="p-2 border-2 border-dashed rounded-lg hover:border-indigo-500 hover:bg-indigo-50 flex flex-col items-center space-y-1"
              >
                <Target className="w-4 h-4" />
                <span className="text-xs">KPI Card</span>
              </button>
              <button
                onClick={() => addComponent('progress')}
                className="p-2 border-2 border-dashed rounded-lg hover:border-cyan-500 hover:bg-cyan-50 flex flex-col items-center space-y-1"
              >
                <Gauge className="w-4 h-4" />
                <span className="text-xs">Progress</span>
              </button>
              <button
                onClick={() => addComponent('stat')}
                className="p-2 border-2 border-dashed rounded-lg hover:border-blue-500 hover:bg-blue-50 flex flex-col items-center space-y-1"
              >
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs">Stat</span>
              </button>
              <button
                onClick={() => addComponent('card')}
                className="p-2 border-2 border-dashed rounded-lg hover:border-blue-500 hover:bg-blue-50 flex flex-col items-center space-y-1"
              >
                <CreditCard className="w-4 h-4" />
                <span className="text-xs">Card</span>
              </button>
              <button
                onClick={() => addComponent('list')}
                className="p-2 border-2 border-dashed rounded-lg hover:border-blue-500 hover:bg-blue-50 flex flex-col items-center space-y-1"
              >
                <List className="w-4 h-4" />
                <span className="text-xs">List</span>
              </button>
              <button
                onClick={() => addComponent('text')}
                className="p-2 border-2 border-dashed rounded-lg hover:border-blue-500 hover:bg-blue-50 flex flex-col items-center space-y-1"
              >
                <FileText className="w-4 h-4" />
                <span className="text-xs">Text</span>
              </button>
              <button
                onClick={() => addComponent('form')}
                className="p-2 border-2 border-dashed rounded-lg hover:border-blue-500 hover:bg-blue-50 flex flex-col items-center space-y-1"
              >
                <FormInput className="w-4 h-4" />
                <span className="text-xs">Form</span>
              </button>
              <button
                onClick={() => addComponent('button')}
                className="p-2 border-2 border-dashed rounded-lg hover:border-blue-500 hover:bg-blue-50 flex flex-col items-center space-y-1"
              >
                <Square className="w-4 h-4" />
                <span className="text-xs">Button</span>
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold">Queries</h2>
              <Link href={`/dashboard/apps/${appId}/queries/new`}>
                <Button variant="outline" size="sm">
                  <Plus className="w-3 h-3 mr-1" />
                  New
                </Button>
              </Link>
            </div>

            {loadingQueries ? (
              <Loader2 className="w-6 h-6 animate-spin mx-auto" />
            ) : queries.length === 0 ? (
              <div className="text-center py-8 text-sm text-gray-500">
                <Code className="w-8 h-8 mx-auto mb-2" />
                <div>No queries yet</div>
              </div>
            ) : (
              <div className="space-y-2">
                {queries.map((query) => (
                  <div
                    key={query.id}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => selectedComponent && bindQueryToComponent(selectedComponent, query.id)}
                  >
                    <div className="flex items-start space-x-2">
                      <Code className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{query.name}</div>
                        <div className="text-xs text-gray-500">{query.dataSource?.name}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedComponent && queries.length > 0 && !bindingQuery && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
                Click a query to bind data to the selected component
              </div>
            )}

            {bindingQuery && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-700 flex items-center">
                <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                Binding query...
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-auto p-8 bg-gray-100">
          {components.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <TableIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Start Building</h3>
                <p className="text-gray-600">Add components from the sidebar</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {components.map((component) => (
                <div
                  key={component.id}
                  onClick={() => setSelectedComponent(component.id)}
                >
                <Card
                  className={`cursor-pointer ${
                    selectedComponent === component.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {component.type === 'table' && <TableIcon className="w-4 h-4 text-blue-600" />}
                      {component.type === 'chart' && <BarChart3 className="w-4 h-4 text-blue-600" />}
                      {component.type === 'lineChart' && <LineChartIcon className="w-4 h-4 text-purple-600" />}
                      {component.type === 'pieChart' && <PieChartIcon className="w-4 h-4 text-pink-600" />}
                      {component.type === 'areaChart' && <Activity className="w-4 h-4 text-green-600" />}
                      {component.type === 'donutChart' && <GitCommit className="w-4 h-4 text-orange-600" />}
                      {component.type === 'gauge' && <Gauge className="w-4 h-4 text-cyan-600" />}
                      {component.type === 'scatterChart' && <GitCommit className="w-4 h-4 text-pink-600" />}
                      {component.type === 'radarChart' && <Radar className="w-4 h-4 text-orange-600" />}
                      {component.type === 'metricCard' && <Hash className="w-4 h-4 text-indigo-600" />}
                      {component.type === 'kpi' && <Target className="w-4 h-4 text-indigo-600" />}
                      {component.type === 'progress' && <Gauge className="w-4 h-4 text-cyan-600" />}
                      {component.type === 'card' && <CreditCard className="w-4 h-4 text-blue-600" />}
                      {component.type === 'stat' && <TrendingUp className="w-4 h-4 text-blue-600" />}
                      {component.type === 'list' && <List className="w-4 h-4 text-blue-600" />}
                      {component.type === 'text' && <FileText className="w-4 h-4 text-blue-600" />}
                      {component.type === 'form' && <FormInput className="w-4 h-4 text-blue-600" />}
                      {component.type === 'button' && <Square className="w-4 h-4 text-blue-600" />}
                      <span className="text-sm font-medium capitalize">
                        {component.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {component.queryName && (
                        <div className="text-xs text-gray-500 flex items-center space-x-1">
                          <Code className="w-3 h-3" />
                          <span>{component.queryName}</span>
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeComponent(component.id);
                        }}
                        className="p-1 hover:bg-red-100 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-white">
                    {renderComponent(component)}
                  </div>
                </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
