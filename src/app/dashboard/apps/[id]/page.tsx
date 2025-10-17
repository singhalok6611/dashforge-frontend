'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import {
  ArrowLeft,
  Edit,
  Settings,
  ExternalLink,
  Loader2,
  Layout,
  FileText,
  Database,
  Code,
  Target,
  Gauge
} from 'lucide-react';
import {
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
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

interface App {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  icon: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  creator: {
    name: string;
    email: string;
  };
  _count: {
    pages: number;
    queries: number;
    dataSources?: number;
  };
}

interface SavedComponent {
  id: string;
  type: string;
  label: string;
  config: any;
  position: number;
}

export default function ViewAppPage() {
  const params = useParams();
  const router = useRouter();
  const appId = params.id as string;

  const [app, setApp] = useState<App | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savedComponents, setSavedComponents] = useState<SavedComponent[]>([]);

  useEffect(() => {
    fetchApp();
    loadSavedLayout();
  }, [appId]);

  const loadSavedLayout = async () => {
    console.log('Loading saved layout for app:', appId);
    try {
      const response = await api.get(`/apps/${appId}/layout`);

      const data = response.data;
      console.log('Loaded layout data:', data);

      if (data.success && data.data.layout) {
        const loadedComponents = data.data.layout;
        console.log('Loaded components:', loadedComponents);

        // Re-execute queries for components that have a queryId to get fresh data
        const componentsWithData = await Promise.all(
          loadedComponents.map(async (comp: any) => {
            if (comp.queryId) {
              console.log('Re-executing query for component:', comp.id, 'queryId:', comp.queryId);
              try {
                const queryResponse = await api.post(
                  `/apps/${appId}/queries/${comp.queryId}/execute`,
                  { parameters: {} }
                );

                const result = queryResponse.data;
                console.log('Query result for component', comp.id, ':', result);

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

        console.log('Components with data:', componentsWithData);
        setSavedComponents(componentsWithData);
      } else {
        console.log('No layout data found or invalid response');
      }
    } catch (error) {
      console.error('Error loading saved layout:', error);
    }
  };

  const openPreviewInNewTab = () => {
    const previewWindow = window.open('', '_blank', 'width=1200,height=800');
    if (!previewWindow || savedComponents.length === 0) return;

    const componentHTML = savedComponents.map((comp: any, idx: number) => {
      // Use actual data from comp.data
      if (comp.type === 'table' && comp.data && Array.isArray(comp.data) && comp.data.length > 0) {
        const columnHeaders = Object.keys(comp.data[0]).map(key =>
          '<th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-200">' + key.replace(/_/g, ' ') + '</th>'
        ).join('');
        const rows = comp.data.slice(0, 15).map((row: any, idx: number) => {
          const cells = Object.values(row).map(val => '<td class="px-6 py-4 text-sm text-gray-700 border-b border-gray-100">' + String(val) + '</td>').join('');
          return '<tr class="' + (idx % 2 === 0 ? 'bg-white' : 'bg-gray-50') + ' hover:bg-blue-50 transition-colors">' + cells + '</tr>';
        }).join('');
        return '<div class="bg-white rounded-xl shadow-lg overflow-hidden mb-6"><div class="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200"><h3 class="text-sm font-semibold text-gray-800">Data Table</h3></div><div class="overflow-x-auto"><table class="w-full"><thead class="bg-gray-100"><tr>' + columnHeaders + '</tr></thead><tbody>' + rows + '</tbody></table></div><div class="px-6 py-3 bg-gray-50 border-t border-gray-200 text-right"><p class="text-xs text-gray-500">' + comp.data.length + ' total records</p></div></div>';
      } else if ((comp.type === 'chart' || comp.type === 'lineChart' || comp.type === 'pieChart' || comp.type === 'areaChart' || comp.type === 'donutChart' || comp.type === 'gauge' || comp.type === 'scatterChart' || comp.type === 'radarChart') && comp.data && Array.isArray(comp.data) && comp.data.length > 0) {
        const chartTitle = comp.type === 'chart' ? 'Bar Chart' : comp.type === 'lineChart' ? 'Line Chart' : comp.type === 'pieChart' ? 'Pie Chart' : comp.type === 'areaChart' ? 'Area Chart' : comp.type === 'donutChart' ? 'Donut Chart' : comp.type === 'gauge' ? 'Gauge' : comp.type === 'scatterChart' ? 'Scatter Chart' : 'Radar Chart';
        return '<div class="bg-white rounded-xl shadow-lg p-6 mb-6 hover:shadow-2xl transition-shadow duration-300"><h3 class="text-sm font-semibold text-gray-800 mb-4 flex items-center"><svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>' + chartTitle + '</h3><div class="relative" style="height: 350px;"><canvas id="chart' + idx + '"></canvas></div></div>';
      } else if (comp.type === 'metricCard' && comp.data && Array.isArray(comp.data) && comp.data.length > 0) {
        const firstItem = comp.data[0];
        const numericCol = Object.keys(firstItem).find(key => !isNaN(Number(firstItem[key])));
        const metricValue = numericCol ? Number(firstItem[numericCol]) : comp.data.length;
        const metricLabel = numericCol ? numericCol.replace(/_/g, ' ') : 'Total';
        const trend = comp.data.length > 1 && numericCol ? ((Number(comp.data[0][numericCol]) - Number(comp.data[1][numericCol])) / Number(comp.data[1][numericCol])) * 100 : Math.random() > 0.5 ? 12.5 : -8.3;
        const isPositive = trend >= 0;
        const trendArrow = isPositive ? '<svg class="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>' : '<svg class="w-6 h-6 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>';
        const trendColor = isPositive ? 'text-green-300' : 'text-red-300';
        return '<div class="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl p-8 mb-6 transform hover:scale-105 transition-transform"><div class="flex items-start justify-between text-white"><div class="flex-1"><div class="text-sm font-medium text-blue-100 uppercase tracking-wider mb-2">' + metricLabel + '</div><div class="text-5xl font-extrabold mb-4">' + metricValue.toLocaleString() + '</div><div class="flex items-center space-x-2">' + trendArrow + '<span class="text-lg font-semibold ' + trendColor + '">' + Math.abs(trend).toFixed(1) + '%</span><span class="text-sm text-blue-100">vs previous</span></div></div><div class="p-4 bg-white/20 backdrop-blur-sm rounded-xl"><svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg></div></div></div>';
      } else if (comp.type === 'kpi' && comp.data && Array.isArray(comp.data) && comp.data.length > 0) {
        const firstItem = comp.data[0];
        const numericCol = Object.keys(firstItem).find(key => !isNaN(Number(firstItem[key])));
        const kpiValue = numericCol ? Number(firstItem[numericCol]) : comp.data.length;
        const kpiLabel = numericCol ? numericCol.replace(/_/g, ' ') : 'Count';
        return '<div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-xl p-8 mb-6 transform hover:scale-105 transition-transform"><div class="flex items-center justify-between"><div class="flex items-center space-x-4"><div class="p-4 bg-white/20 backdrop-blur-sm rounded-xl"><svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg></div><div><div class="text-4xl font-bold text-white mb-1">' + kpiValue.toLocaleString() + '</div><div class="text-sm text-blue-100 uppercase tracking-wide font-medium">' + kpiLabel + '</div></div></div></div></div>';
      } else if (comp.type === 'progress' && comp.data && Array.isArray(comp.data) && comp.data.length > 0) {
        const firstItem = comp.data[0];
        const numericCol = Object.keys(firstItem).find(key => !isNaN(Number(firstItem[key])));
        const progValue = numericCol ? Number(firstItem[numericCol]) : 0;
        const progPercentage = Math.min(Math.max(progValue, 0), 100);
        const progLabel = numericCol ? numericCol.replace(/_/g, ' ') : 'Progress';
        const progressColor = progPercentage >= 75 ? 'from-green-500 to-green-600' : progPercentage >= 50 ? 'from-blue-500 to-blue-600' : progPercentage >= 25 ? 'from-yellow-500 to-yellow-600' : 'from-red-500 to-red-600';
        return '<div class="bg-white rounded-xl shadow-lg p-6 mb-6"><div class="space-y-3"><div class="flex items-center justify-between"><span class="text-sm font-semibold text-gray-700 uppercase tracking-wide">' + progLabel + '</span><span class="text-2xl font-bold text-gray-900">' + progPercentage.toFixed(1) + '%</span></div><div class="relative w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner"><div class="h-full bg-gradient-to-r ' + progressColor + ' rounded-full shadow-lg transition-all duration-500 flex items-center justify-end pr-3" style="width: ' + progPercentage + '%"><span class="text-xs font-bold text-white">' + progPercentage.toFixed(0) + '%</span></div></div></div></div>';
      } else if (comp.type === 'card' && comp.data && Array.isArray(comp.data) && comp.data.length > 0) {
        const dataEntries = Object.entries(comp.data[0]).map(([key, value]) =>
          '<div class="flex justify-between text-sm py-1"><span class="text-gray-600">' + key + ':</span><span class="font-medium">' + String(value) + '</span></div>'
        ).join('');
        return '<div class="bg-white rounded-lg shadow p-6 mb-4"><h3 class="font-bold text-lg mb-3">Data Card</h3>' + dataEntries + '</div>';
      } else if (comp.type === 'stat' && comp.data && Array.isArray(comp.data) && comp.data.length > 0) {
        const firstItem = comp.data[0];
        const numericCol = Object.keys(firstItem).find(key => !isNaN(Number(firstItem[key])));
        const statValue = numericCol ? Number(firstItem[numericCol]) : comp.data.length;
        const statLabel = numericCol ? numericCol.replace(/_/g, ' ') : 'Total Records';
        return '<div class="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-8 mb-6 border-l-4 border-blue-600 hover:shadow-2xl transition-all stat-card"><div class="flex items-center justify-between"><div class="flex-1"><div class="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">' + statValue.toLocaleString() + '</div><div class="text-sm font-semibold text-gray-600 uppercase tracking-wider">' + statLabel + '</div></div><div class="p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl"><svg class="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg></div></div></div>';
      } else if (comp.type === 'list' && comp.data && Array.isArray(comp.data)) {
        const listTitle = Object.keys(comp.data[0] || {})[0]?.replace(/_/g, ' ') || 'Items';
        const listItems = comp.data.slice(0, 8).map((item: any, idx: number) => {
          const value = Object.values(item)[0];
          const secondValue = Object.values(item)[1];
          return '<li class="flex items-center justify-between py-3 px-4 hover:bg-blue-50 rounded-lg transition-colors group"><div class="flex items-center space-x-3"><span class="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full text-sm font-bold group-hover:scale-110 transition-transform">' + (idx + 1) + '</span><span class="text-gray-700 font-medium">' + String(value) + '</span></div>' + (secondValue !== undefined ? '<span class="text-gray-900 font-semibold bg-gray-100 px-3 py-1 rounded-full">' + String(secondValue) + '</span>' : '') + '</li>'
        }).join('');
        return '<div class="bg-white rounded-xl shadow-lg overflow-hidden mb-6"><div class="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600"><h3 class="text-white font-bold text-lg capitalize">' + listTitle + '</h3></div><div class="p-6"><ul class="space-y-2">' + listItems + '</ul></div><div class="px-6 py-3 bg-gray-50 border-t border-gray-200 text-right"><p class="text-xs text-gray-500">' + comp.data.length + ' total items</p></div></div>';
      } else if (comp.type === 'button') {
        return '<div class="mb-4"><button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">' + (comp.config?.text || 'Button') + '</button></div>';
      } else if (comp.type === 'text') {
        return '<div class="mb-4"><p class="text-gray-700 bg-white p-4 rounded-lg shadow">' + (comp.config?.content || 'Text content') + '</p></div>';
      } else if (comp.type === 'form') {
        return '<div class="bg-white rounded-lg shadow p-6 mb-4 space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Name</label><input type="text" class="w-full px-3 py-2 border rounded-lg" placeholder="Enter your name" /></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" class="w-full px-3 py-2 border rounded-lg" placeholder="Enter your email" /></div><button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Submit</button></div>';
      }
      return '';
    }).join('');

    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

    // Generate Chart.js initialization scripts
    const chartScripts = savedComponents.map((comp: any, idx: number) => {
      if (comp.type === 'lineChart' && comp.data && Array.isArray(comp.data) && comp.data.length > 0) {
        const firstItem = comp.data[0];
        const numericCols = Object.keys(firstItem).filter(key => !isNaN(Number(firstItem[key])));
        const labelCol = Object.keys(firstItem).find(key => typeof firstItem[key] === 'string') || Object.keys(firstItem)[0];
        const labels = comp.data.slice(0, 10).map((item: any) => String(item[labelCol] || 'N/A'));
        const values = comp.data.slice(0, 10).map((item: any) => numericCols.length > 0 ? Number(item[numericCols[0]]) : 0);
        return 'new Chart(document.getElementById("chart' + idx + '"),{type:"line",data:{labels:' + JSON.stringify(labels) + ',datasets:[{label:"' + (numericCols[0] || 'Value') + '",data:' + JSON.stringify(values) + ',borderColor:"rgb(139,92,246)",backgroundColor:"rgba(139,92,246,0.1)",tension:0.4,fill:true}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:true,position:"top"}},scales:{y:{beginAtZero:true,grid:{color:"rgba(0,0,0,0.05)"}},x:{grid:{display:false}}}}});';
      } else if (comp.type === 'pieChart' && comp.data && Array.isArray(comp.data) && comp.data.length > 0) {
        const firstItem = comp.data[0];
        const numericCols = Object.keys(firstItem).filter(key => !isNaN(Number(firstItem[key])));
        const labelCol = Object.keys(firstItem).find(key => typeof firstItem[key] === 'string') || Object.keys(firstItem)[0];
        const labels = comp.data.slice(0, 6).map((item: any) => String(item[labelCol] || 'N/A'));
        const values = comp.data.slice(0, 6).map((item: any) => numericCols.length > 0 ? Number(item[numericCols[0]]) : 1);
        return 'new Chart(document.getElementById("chart' + idx + '"),{type:"pie",data:{labels:' + JSON.stringify(labels) + ',datasets:[{data:' + JSON.stringify(values) + ',backgroundColor:["rgb(59,130,246)","rgb(139,92,246)","rgb(236,72,153)","rgb(245,158,11)","rgb(16,185,129)","rgb(6,182,212)"]}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:"right"}}}});';
      } else if (comp.type === 'donutChart' && comp.data && Array.isArray(comp.data) && comp.data.length > 0) {
        const firstItem = comp.data[0];
        const numericCols = Object.keys(firstItem).filter(key => !isNaN(Number(firstItem[key])));
        const labelCol = Object.keys(firstItem).find(key => typeof firstItem[key] === 'string') || Object.keys(firstItem)[0];
        const labels = comp.data.slice(0, 6).map((item: any) => String(item[labelCol] || 'N/A'));
        const values = comp.data.slice(0, 6).map((item: any) => numericCols.length > 0 ? Number(item[numericCols[0]]) : 1);
        return 'new Chart(document.getElementById("chart' + idx + '"),{type:"doughnut",data:{labels:' + JSON.stringify(labels) + ',datasets:[{data:' + JSON.stringify(values) + ',backgroundColor:["rgb(59,130,246)","rgb(139,92,246)","rgb(236,72,153)","rgb(245,158,11)","rgb(16,185,129)","rgb(6,182,212)"]}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:"right"}}}});';
      } else if (comp.type === 'gauge' && comp.data && Array.isArray(comp.data) && comp.data.length > 0) {
        const firstItem = comp.data[0];
        const numericCol = Object.keys(firstItem).find(key => !isNaN(Number(firstItem[key])));
        const gaugeValue = numericCol ? Number(firstItem[numericCol]) : 50;
        const gaugePercentage = Math.min(Math.max(gaugeValue, 0), 100);
        return 'new Chart(document.getElementById("chart' + idx + '"),{type:"doughnut",data:{datasets:[{data:[' + gaugePercentage + ',' + (100 - gaugePercentage) + '],backgroundColor:["rgb(59,130,246)","rgb(229,231,235)"],borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,rotation:-90,circumference:180,cutout:"75%",plugins:{legend:{display:false},tooltip:{enabled:false}}}});';
      } else if (comp.type === 'scatterChart' && comp.data && Array.isArray(comp.data) && comp.data.length > 0) {
        const firstItem = comp.data[0];
        const numericCols = Object.keys(firstItem).filter(key => !isNaN(Number(firstItem[key])));
        const scatterData = comp.data.slice(0, 50).map((item: any) => ({
          x: numericCols.length > 0 ? Number(item[numericCols[0]]) : Math.random() * 100,
          y: numericCols.length > 1 ? Number(item[numericCols[1]]) : Math.random() * 100
        }));
        return 'new Chart(document.getElementById("chart' + idx + '"),{type:"scatter",data:{datasets:[{label:"Data Points",data:' + JSON.stringify(scatterData) + ',backgroundColor:"rgba(236,72,153,0.6)",borderColor:"rgb(236,72,153)",pointRadius:5}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:true}},scales:{x:{type:"linear",position:"bottom",grid:{color:"rgba(0,0,0,0.05)"}},y:{grid:{color:"rgba(0,0,0,0.05)"}}}}});';
      } else if (comp.type === 'radarChart' && comp.data && Array.isArray(comp.data) && comp.data.length > 0) {
        const firstItem = comp.data[0];
        const numericCols = Object.keys(firstItem).filter(key => !isNaN(Number(firstItem[key])));
        const labelCol = Object.keys(firstItem).find(key => typeof firstItem[key] === 'string') || Object.keys(firstItem)[0];
        const labels = comp.data.slice(0, 8).map((item: any) => String(item[labelCol] || 'N/A').substring(0, 15));
        const values = comp.data.slice(0, 8).map((item: any) => numericCols.length > 0 ? Number(item[numericCols[0]]) : 1);
        return 'new Chart(document.getElementById("chart' + idx + '"),{type:"radar",data:{labels:' + JSON.stringify(labels) + ',datasets:[{label:"Value",data:' + JSON.stringify(values) + ',borderColor:"rgb(245,158,11)",backgroundColor:"rgba(245,158,11,0.2)",pointBackgroundColor:"rgb(245,158,11)",pointBorderColor:"#fff",pointHoverBackgroundColor:"#fff",pointHoverBorderColor:"rgb(245,158,11)"}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:"top"}},scales:{r:{beginAtZero:true,grid:{color:"rgba(0,0,0,0.05)"},angleLines:{color:"rgba(0,0,0,0.1)"},pointLabels:{font:{size:10}}}}}});';
      } else if (comp.type === 'areaChart' && comp.data && Array.isArray(comp.data) && comp.data.length > 0) {
        const firstItem = comp.data[0];
        const numericCols = Object.keys(firstItem).filter(key => !isNaN(Number(firstItem[key])));
        const labelCol = Object.keys(firstItem).find(key => typeof firstItem[key] === 'string') || Object.keys(firstItem)[0];
        const labels = comp.data.slice(0, 10).map((item: any) => String(item[labelCol] || 'N/A'));
        const values = comp.data.slice(0, 10).map((item: any) => numericCols.length > 0 ? Number(item[numericCols[0]]) : 0);
        return 'new Chart(document.getElementById("chart' + idx + '"),{type:"line",data:{labels:' + JSON.stringify(labels) + ',datasets:[{label:"' + (numericCols[0] || 'Value') + '",data:' + JSON.stringify(values) + ',borderColor:"rgb(16,185,129)",backgroundColor:"rgba(16,185,129,0.3)",tension:0.4,fill:true}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:true,position:"top"}},scales:{y:{beginAtZero:true,grid:{color:"rgba(0,0,0,0.05)"}},x:{grid:{display:false}}}}});';
      } else if (comp.type === 'chart' && comp.data && Array.isArray(comp.data) && comp.data.length > 0) {
        const labels = comp.data.slice(0, 10).map((item: any, i: number) => 'Item ' + (i + 1));
        const values = comp.data.slice(0, 10).map((item: any) => Object.values(item).find(v => typeof v === 'number') || 50);
        return 'new Chart(document.getElementById("chart' + idx + '"),{type:"bar",data:{labels:' + JSON.stringify(labels) + ',datasets:[{label:"Value",data:' + JSON.stringify(values) + ',backgroundColor:"rgba(59,130,246,0.8)",borderColor:"rgb(59,130,246)",borderWidth:1}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,grid:{color:"rgba(0,0,0,0.05)"}},x:{grid:{display:false}}}}});';
      }
      return '';
    }).filter(s => s).join('');

    const html = '<!DOCTYPE html><html lang="en" class="scroll-smooth"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>' + (app?.name || 'App') + ' - Dashboard Preview</title><script src="https://cdn.tailwindcss.com"></script><script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script><style>@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");body{font-family:"Inter",sans-serif}@media print{body{background:white}.no-print{display:none}}@keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}.fade-in{animation:fadeInUp 0.6s ease-out forwards}.fade-delay-1{animation-delay:0.1s}.fade-delay-2{animation-delay:0.2s}.fade-delay-3{animation-delay:0.3s}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}.pulse{animation:pulse 2s cubic-bezier(0.4,0,0.6,1) infinite}.stat-card{transition:all 0.3s ease;cursor:pointer}.stat-card:hover{transform:translateY(-5px) scale(1.02)}table tr{transition:all 0.2s ease}::-webkit-scrollbar{width:8px;height:8px}::-webkit-scrollbar-track{background:#f1f1f1;border-radius:10px}::-webkit-scrollbar-thumb{background:#888;border-radius:10px}::-webkit-scrollbar-thumb:hover{background:#555}</style></head><body class="bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 min-h-screen"><button id="scrollTopBtn" onclick="window.scrollTo({top:0,behavior:\'smooth\'})" class="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-all hover:scale-110 no-print z-50" style="display:none"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg></button><div class="max-w-7xl mx-auto p-8"><header class="bg-white rounded-2xl shadow-2xl mb-8 overflow-hidden fade-in"><div class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-8 py-8 relative overflow-hidden"><div class="absolute inset-0 opacity-20"><div class="absolute inset-0" style="background-image:radial-gradient(circle at 20% 50%,white 1px,transparent 1px);background-size:20px 20px"></div></div><div class="relative flex items-center justify-between"><div><h1 class="text-4xl font-bold text-white mb-3 tracking-tight">' + (app?.name || 'Dashboard') + '</h1><p class="text-blue-100 text-lg">' + (app?.description || 'Analytics Dashboard') + '</p></div><div class="bg-white/20 backdrop-blur-md rounded-xl px-6 py-3 border border-white/30"><p class="text-white text-sm font-semibold">📅 ' + currentDate + '</p></div></div></div><div class="px-8 py-5 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200"><div class="flex items-center justify-between"><p class="text-sm font-semibold text-gray-700 flex items-center"><svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>' + savedComponents.length + ' Interactive Components</p><button onclick="window.print()" class="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center no-print"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>Print Report</button></div></div></header><main class="space-y-6" id="mainContent">' + componentHTML + '</main><footer class="mt-16 text-center pb-8 no-print fade-in fade-delay-3"><div class="bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-lg p-8 border border-gray-200"><div class="flex items-center justify-center space-x-2 mb-3"><svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg><p class="text-gray-700 text-lg font-semibold">Powered by DashForge</p></div><p class="text-gray-500 text-sm">Build beautiful dashboards without code</p><p class="text-gray-400 text-xs mt-3">© ' + new Date().getFullYear() + ' DashForge. All rights reserved.</p></div></footer></div><script>window.addEventListener("load",function(){' + chartScripts + 'const elements=document.querySelectorAll("main > div");elements.forEach((el,i)=>{el.classList.add("fade-in");el.style.animationDelay=(i*0.1)+"s"});window.addEventListener("scroll",function(){const btn=document.getElementById("scrollTopBtn");if(document.body.scrollTop>300||document.documentElement.scrollTop>300){btn.style.display="block"}else{btn.style.display="none"}})});</script></body></html>';

    previewWindow.document.write(html);
    previewWindow.document.close();
  };

  const fetchApp = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/apps/${appId}`);

      const data = response.data;

      if (data.success) {
        setApp(data.data);
      } else {
        setError('Failed to load app');
      }
    } catch (err) {
      console.error('Error fetching app:', err);
      setError('Failed to load app');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading app...</p>
        </div>
      </div>
    );
  }

  if (error || !app) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">App Not Found</h2>
            <p className="text-gray-600 mb-6">{error || 'The app you are looking for does not exist.'}</p>
            <Link href="/dashboard/apps">
              <Button variant="primary">Back to Apps</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard/apps" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Apps
          </Link>

          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                {app.icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{app.name}</h1>
                <p className="text-gray-600 mb-3">
                  {app.description || 'No description'}
                </p>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    app._count.pages > 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {app._count.pages > 0 ? 'Active' : 'Draft'}
                  </span>
                  {app.isPublic && (
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      Public
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Link href={`/dashboard/apps/${app.id}/builder`}>
                <Button variant="primary">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit App
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Queries</p>
                  <p className="text-2xl font-bold text-gray-900">{app._count.queries}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Data Sources</p>
                  <p className="text-2xl font-bold text-gray-900">{app._count?.dataSources || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Components</p>
                  <p className="text-2xl font-bold text-gray-900">{savedComponents.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* App Preview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>App Preview</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={openPreviewInNewTab}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in New Tab
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {savedComponents.length === 0 ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
                    <Layout className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Components Yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Start building your app by adding components in the visual builder
                    </p>
                    <Link href={`/dashboard/apps/${app.id}/builder`}>
                      <Button variant="primary">
                        <Layout className="w-4 h-4 mr-2" />
                        Open Visual Builder
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto p-4 bg-gray-50 rounded-lg">
                    {savedComponents.map((component: any) => (
                      <div key={component.id} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-gray-500 uppercase">{component.type}</span>
                          {component.queryName && (
                            <span className="text-xs text-blue-600">Query: {component.queryName}</span>
                          )}
                        </div>
                        {component.type === 'table' && component.data && Array.isArray(component.data) && component.data.length > 0 && (
                          <div className="border rounded-lg overflow-hidden">
                            <table className="w-full">
                              <thead className="bg-gray-50">
                                <tr>
                                  {Object.keys(component.data[0]).map((key, i) => (
                                    <th key={i} className="px-4 py-2 text-left text-sm font-medium text-gray-700">{key}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {component.data.slice(0, 5).map((row: any, i: number) => (
                                  <tr key={i} className="border-t">
                                    {Object.values(row).map((val: any, j: number) => (
                                      <td key={j} className="px-4 py-2 text-sm text-gray-600">{String(val)}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                        {component.type === 'table' && (!component.data || !Array.isArray(component.data) || component.data.length === 0) && (
                          <div className="p-4 text-center text-gray-500">
                            No data bound to this table
                          </div>
                        )}
                        {component.type === 'chart' && component.data && Array.isArray(component.data) && component.data.length > 0 && (
                          <div className="border rounded-lg p-6 bg-gradient-to-br from-blue-50 to-purple-50">
                            <div className="flex items-end justify-around h-32">
                              {component.data.slice(0, 10).map((item: any, i: number) => {
                                const numericValue = Object.values(item).find(v => typeof v === 'number') as number || 50;
                                const normalizedHeight = Math.min(100, Math.max(10, (numericValue / 10) * 10));
                                return (
                                  <div key={i} className="w-8 bg-blue-500 rounded-t" style={{ height: `${normalizedHeight}%` }} />
                                );
                              })}
                            </div>
                            <p className="text-center text-sm text-gray-600 mt-4">{component.data.length} data points</p>
                          </div>
                        )}
                        {component.type === 'chart' && (!component.data || !Array.isArray(component.data) || component.data.length === 0) && (
                          <div className="p-4 text-center text-gray-500">
                            No data bound to this chart
                          </div>
                        )}
                        {component.type === 'lineChart' && component.data && Array.isArray(component.data) && component.data.length > 0 && (() => {
                          const firstItem = component.data[0];
                          const numericCols = Object.keys(firstItem).filter((key: string) => !isNaN(Number(firstItem[key])));
                          const labelCol = Object.keys(firstItem).find((key: string) => typeof firstItem[key] === 'string') || Object.keys(firstItem)[0];
                          const chartData = component.data.slice(0, 20).map((item: any) => ({
                            name: String(item[labelCol] || 'N/A'),
                            value: numericCols.length > 0 ? Number(item[numericCols[0]]) : 1,
                          }));
                          return (
                            <ResponsiveContainer width="100%" height={250}>
                              <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} />
                              </LineChart>
                            </ResponsiveContainer>
                          );
                        })()}
                        {component.type === 'pieChart' && component.data && Array.isArray(component.data) && component.data.length > 0 && (() => {
                          const firstItem = component.data[0];
                          const numericCols = Object.keys(firstItem).filter((key: string) => !isNaN(Number(firstItem[key])));
                          const labelCol = Object.keys(firstItem).find((key: string) => typeof firstItem[key] === 'string') || Object.keys(firstItem)[0];
                          const chartData = component.data.slice(0, 8).map((item: any) => ({
                            name: String(item[labelCol] || 'N/A'),
                            value: numericCols.length > 0 ? Number(item[numericCols[0]]) : 1,
                          }));
                          const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#6366f1', '#f43f5e'];
                          return (
                            <ResponsiveContainer width="100%" height={250}>
                              <PieChart>
                                <Pie
                                  data={chartData}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="value"
                                >
                                  {chartData.map((entry: any, index: number) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          );
                        })()}
                        {component.type === 'areaChart' && component.data && Array.isArray(component.data) && component.data.length > 0 && (() => {
                          const firstItem = component.data[0];
                          const numericCols = Object.keys(firstItem).filter((key: string) => !isNaN(Number(firstItem[key])));
                          const labelCol = Object.keys(firstItem).find((key: string) => typeof firstItem[key] === 'string') || Object.keys(firstItem)[0];
                          const chartData = component.data.slice(0, 20).map((item: any) => ({
                            name: String(item[labelCol] || 'N/A'),
                            value: numericCols.length > 0 ? Number(item[numericCols[0]]) : 1,
                          }));
                          return (
                            <ResponsiveContainer width="100%" height={250}>
                              <AreaChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area type="monotone" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                              </AreaChart>
                            </ResponsiveContainer>
                          );
                        })()}
                        {component.type === 'donutChart' && component.data && Array.isArray(component.data) && component.data.length > 0 && (() => {
                          const firstItem = component.data[0];
                          const numericCols = Object.keys(firstItem).filter((key: string) => !isNaN(Number(firstItem[key])));
                          const labelCol = Object.keys(firstItem).find((key: string) => typeof firstItem[key] === 'string') || Object.keys(firstItem)[0];
                          const chartData = component.data.slice(0, 8).map((item: any) => ({
                            name: String(item[labelCol] || 'N/A'),
                            value: numericCols.length > 0 ? Number(item[numericCols[0]]) : 1,
                          }));
                          const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#6366f1', '#f43f5e'];
                          return (
                            <ResponsiveContainer width="100%" height={250}>
                              <PieChart>
                                <Pie
                                  data={chartData}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                  outerRadius={80}
                                  innerRadius={48}
                                  fill="#8884d8"
                                  dataKey="value"
                                >
                                  {chartData.map((entry: any, index: number) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          );
                        })()}
                        {component.type === 'gauge' && component.data && Array.isArray(component.data) && component.data.length > 0 && (() => {
                          const firstItem = component.data[0];
                          const numericCol = Object.keys(firstItem).find((key: string) => !isNaN(Number(firstItem[key])));
                          const gaugeValue = numericCol ? Number(firstItem[numericCol]) : 50;
                          const gaugePercentage = Math.min(Math.max(gaugeValue, 0), 100);
                          const gaugeLabel = numericCol ? numericCol.replace(/_/g, ' ') : 'Value';
                          const gaugeData = [
                            { name: 'Value', value: gaugePercentage },
                            { name: 'Remaining', value: 100 - gaugePercentage }
                          ];
                          return (
                            <ResponsiveContainer width="100%" height={250}>
                              <PieChart>
                                <Pie
                                  data={gaugeData}
                                  cx="50%"
                                  cy="70%"
                                  startAngle={180}
                                  endAngle={0}
                                  innerRadius={60}
                                  outerRadius={90}
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
                                  className="text-3xl font-bold fill-gray-900"
                                >
                                  {gaugePercentage.toFixed(0)}%
                                </text>
                                <text
                                  x="50%"
                                  y="70%"
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                  className="text-xs fill-gray-500"
                                >
                                  {gaugeLabel}
                                </text>
                              </PieChart>
                            </ResponsiveContainer>
                          );
                        })()}
                        {component.type === 'scatterChart' && component.data && Array.isArray(component.data) && component.data.length > 0 && (() => {
                          const firstItem = component.data[0];
                          const numericCols = Object.keys(firstItem).filter((key: string) => !isNaN(Number(firstItem[key])));
                          const chartData = component.data.slice(0, 50).map((item: any) => ({
                            x: numericCols.length > 0 ? Number(item[numericCols[0]]) : Math.random() * 100,
                            y: numericCols.length > 1 ? Number(item[numericCols[1]]) : Math.random() * 100,
                          }));
                          return (
                            <ResponsiveContainer width="100%" height={250}>
                              <ScatterChart>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" dataKey="x" name={numericCols[0] || 'X'} />
                                <YAxis type="number" dataKey="y" name={numericCols[1] || 'Y'} />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Legend />
                                <Scatter name="Data Points" data={chartData} fill="#ec4899" />
                              </ScatterChart>
                            </ResponsiveContainer>
                          );
                        })()}
                        {component.type === 'radarChart' && component.data && Array.isArray(component.data) && component.data.length > 0 && (() => {
                          const firstItem = component.data[0];
                          const numericCols = Object.keys(firstItem).filter((key: string) => !isNaN(Number(firstItem[key])));
                          const labelCol = Object.keys(firstItem).find((key: string) => typeof firstItem[key] === 'string') || Object.keys(firstItem)[0];
                          const chartData = component.data.slice(0, 8).map((item: any) => ({
                            subject: String(item[labelCol] || 'N/A').substring(0, 15),
                            value: numericCols.length > 0 ? Number(item[numericCols[0]]) : 1,
                          }));
                          return (
                            <ResponsiveContainer width="100%" height={250}>
                              <RadarChart data={chartData}>
                                <PolarGrid stroke="#e5e7eb" />
                                <PolarAngleAxis dataKey="subject" />
                                <PolarRadiusAxis angle={90} />
                                <Radar
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
                          );
                        })()}
                        {component.type === 'metricCard' && component.data && Array.isArray(component.data) && component.data.length > 0 && (() => {
                          const firstItem = component.data[0];
                          const numericCol = Object.keys(firstItem).find((key: string) => !isNaN(Number(firstItem[key])));
                          const metricValue = numericCol ? Number(firstItem[numericCol]) : component.data.length;
                          const metricLabel = numericCol ? numericCol.replace(/_/g, ' ') : 'Total';
                          const trend = component.data.length > 1 && numericCol ?
                            ((Number(component.data[0][numericCol]) - Number(component.data[1][numericCol])) / Number(component.data[1][numericCol])) * 100 :
                            Math.random() > 0.5 ? 12.5 : -8.3;
                          const isPositive = trend >= 0;
                          return (
                            <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl p-8 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden">
                              <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-white/10 to-transparent"></div>
                              <div className="relative flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="text-sm font-bold text-blue-100 uppercase tracking-widest mb-3 flex items-center space-x-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>
                                    <span>{metricLabel}</span>
                                  </div>
                                  <div className="text-5xl font-black mb-4 tracking-tight group-hover:scale-110 transition-transform duration-300">
                                    {metricValue.toLocaleString()}
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <div className={`flex items-center space-x-1 px-3 py-1.5 rounded-full ${isPositive ? 'bg-green-500/30' : 'bg-red-500/30'}`}>
                                      <svg className={`w-5 h-5 ${isPositive ? 'text-green-200' : 'text-red-200'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {isPositive ? (
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        ) : (
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                                        )}
                                      </svg>
                                      <span className={`text-sm font-black ${isPositive ? 'text-green-200' : 'text-red-200'}`}>
                                        {Math.abs(trend).toFixed(1)}%
                                      </span>
                                    </div>
                                    <span className="text-sm text-blue-100 font-medium">vs previous period</span>
                                  </div>
                                </div>
                                <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl group-hover:bg-white/20 transition-all duration-300 group-hover:rotate-12">
                                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                        {component.type === 'kpi' && component.data && Array.isArray(component.data) && component.data.length > 0 && (() => {
                          const firstItem = component.data[0];
                          const numericCol = Object.keys(firstItem).find((key: string) => !isNaN(Number(firstItem[key])));
                          const kpiValue = numericCol ? Number(firstItem[numericCol]) : component.data.length;
                          const kpiLabel = numericCol || 'Count';
                          return (
                            <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl shadow-2xl p-8 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden">
                              <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-white/20 to-transparent"></div>
                              <div className="relative flex items-center justify-between">
                                <div className="flex items-center space-x-5">
                                  <div className="p-4 bg-white/20 backdrop-blur-md rounded-xl group-hover:bg-white/30 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                                    <Target className="w-10 h-10 text-white" />
                                  </div>
                                  <div>
                                    <div className="text-5xl font-black mb-2 group-hover:scale-105 transition-transform duration-300">
                                      {kpiValue.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-blue-100 uppercase tracking-wider font-bold">
                                      {kpiLabel.replace(/_/g, ' ')}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end space-y-2">
                                  <div className="px-3 py-1.5 bg-white/20 rounded-full text-xs font-bold backdrop-blur-sm">
                                    Live
                                  </div>
                                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                        {component.type === 'progress' && component.data && Array.isArray(component.data) && component.data.length > 0 && (() => {
                          const firstItem = component.data[0];
                          const numericCol = Object.keys(firstItem).find((key: string) => !isNaN(Number(firstItem[key])));
                          const progValue = numericCol ? Number(firstItem[numericCol]) : 0;
                          const progPercentage = Math.min(Math.max(progValue, 0), 100);
                          const progLabel = numericCol ? numericCol.replace(/_/g, ' ') : 'Progress';
                          const progressColor = progPercentage >= 75 ? 'from-green-500 to-emerald-600' : progPercentage >= 50 ? 'from-blue-500 to-cyan-600' : progPercentage >= 25 ? 'from-yellow-500 to-orange-600' : 'from-red-500 to-pink-600';
                          const badgeColor = progPercentage >= 75 ? 'bg-green-100 text-green-700' : progPercentage >= 50 ? 'bg-blue-100 text-blue-700' : progPercentage >= 25 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700';
                          return (
                            <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300 cursor-pointer group border border-gray-100 hover:shadow-blue-200/50">
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                      </svg>
                                    </div>
                                    <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">{progLabel}</span>
                                  </div>
                                  <div className={`px-4 py-2 rounded-full text-sm font-black ${badgeColor}`}>
                                    {progPercentage.toFixed(1)}%
                                  </div>
                                </div>
                                <div className="relative w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner group-hover:shadow-lg transition-shadow duration-300">
                                  <div
                                    className={`h-full bg-gradient-to-r ${progressColor} rounded-full shadow-lg transition-all duration-500 flex items-center justify-end pr-3 relative overflow-hidden`}
                                    style={{ width: `${progPercentage}%` }}
                                  >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-pulse"></div>
                                    {progPercentage > 15 && (
                                      <span className="text-xs font-bold text-white relative z-10">{progPercentage.toFixed(0)}%</span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                  <span className="font-medium">0%</span>
                                  <span className="font-medium">100%</span>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                        {component.type === 'stat' && component.data && Array.isArray(component.data) && component.data.length > 0 && (() => {
                          const firstItem = component.data[0];
                          const numericCol = Object.keys(firstItem).find((key: string) => !isNaN(Number(firstItem[key])));
                          const statValue = numericCol ? Number(firstItem[numericCol]) : component.data.length;
                          const statLabel = numericCol ? numericCol.replace(/_/g, ' ') : 'Total Records';
                          return (
                            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-8 border-l-4 border-blue-600 hover:shadow-blue-200/50 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="text-6xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                                    {statValue.toLocaleString()}
                                  </div>
                                  <div className="text-sm font-bold text-gray-600 uppercase tracking-widest">{statLabel}</div>
                                </div>
                                <div className="p-5 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                                  <svg className="w-14 h-14 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                        {component.type === 'list' && component.data && Array.isArray(component.data) && (() => {
                          const listTitle = Object.keys(component.data[0] || {})[0]?.replace(/_/g, ' ') || 'Items';
                          return (
                            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-purple-200/50 transition-all duration-300 transform hover:scale-105">
                              <div className="px-6 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                                <h3 className="text-white font-black text-lg capitalize flex items-center space-x-2">
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                  </svg>
                                  <span>{listTitle}</span>
                                </h3>
                              </div>
                              <div className="p-6">
                                <ul className="space-y-3">
                                  {component.data.slice(0, 8).map((item: any, i: number) => {
                                    const value = Object.values(item)[0];
                                    const secondValue = Object.values(item)[1];
                                    return (
                                      <li key={i} className="flex items-center justify-between py-3 px-4 hover:bg-blue-50 rounded-xl transition-all duration-200 group cursor-pointer border border-transparent hover:border-blue-200">
                                        <div className="flex items-center space-x-3">
                                          <span className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full text-sm font-bold group-hover:scale-110 transition-transform duration-200 shadow-md">
                                            {i + 1}
                                          </span>
                                          <span className="text-gray-700 font-semibold">{String(value)}</span>
                                        </div>
                                        {secondValue !== undefined && (
                                          <span className="text-gray-900 font-bold bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-1.5 rounded-full text-sm">
                                            {String(secondValue)}
                                          </span>
                                        )}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                              <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 text-right">
                                <p className="text-xs text-gray-600 font-semibold">{component.data.length} total items</p>
                              </div>
                            </div>
                          );
                        })()}
                        {component.type === 'card' && component.data && Array.isArray(component.data) && component.data.length > 0 && (
                          <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-2xl shadow-2xl p-8 border border-gray-100 transform hover:scale-105 transition-all duration-300 cursor-pointer group hover:shadow-purple-200/50">
                            <div className="flex items-center space-x-3 mb-6">
                              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </div>
                              <h3 className="text-xl font-black text-gray-800 tracking-tight">Data Overview</h3>
                            </div>
                            <div className="space-y-3">
                              {Object.entries(component.data[0]).slice(0, 6).map(([key, value], i) => (
                                <div key={i} className="flex justify-between items-center py-3 px-4 rounded-lg bg-white/60 backdrop-blur-sm border border-gray-100 group-hover:bg-white/80 transition-all duration-200 hover:shadow-md">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                                    <span className="text-sm font-semibold text-gray-600 capitalize">{key.replace(/_/g, ' ')}</span>
                                  </div>
                                  <span className="text-sm font-bold text-gray-900 px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
                                    {String(value)}
                                  </span>
                                </div>
                              ))}
                            </div>
                            {Object.entries(component.data[0]).length > 6 && (
                              <div className="mt-4 text-center">
                                <span className="text-xs text-gray-500 font-medium">
                                  +{Object.entries(component.data[0]).length - 6} more fields
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                        {(component.type === 'text' || component.type === 'form' || component.type === 'button') && (
                          <div className="p-4 text-center text-gray-500">
                            {component.type.charAt(0).toUpperCase() + component.type.slice(1)} component
                          </div>
                        )}
                        {!['table', 'chart', 'lineChart', 'pieChart', 'areaChart', 'donutChart', 'gauge', 'scatterChart', 'radarChart', 'metricCard', 'kpi', 'progress', 'stat', 'list', 'card', 'text', 'form', 'button'].includes(component.type) && (
                          <div className="space-y-4 border rounded-lg p-6 bg-white">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                              <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Enter your name" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                              <input type="email" className="w-full px-3 py-2 border rounded-lg" placeholder="Enter your email" />
                            </div>
                            <Button variant="primary">Submit</Button>
                          </div>
                        )}
                        {component.type === 'input' && (
                          <div>
                            {component.config.label && (
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {component.config.label}
                              </label>
                            )}
                            <input
                              type="text"
                              className="w-full px-3 py-2 border rounded-lg"
                              placeholder={component.config.placeholder}
                            />
                          </div>
                        )}
                        {component.type === 'container' && (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                            <p className="text-gray-500 text-center">Container - Drop components here</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* App Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">App Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Created</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(app.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Last Updated</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(app.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Created By</p>
                  <p className="text-sm font-medium text-gray-900">{app.creator.name}</p>
                  <p className="text-xs text-gray-500">{app.creator.email}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Slug</p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-900">
                    {app.slug}
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href={`/dashboard/apps/${app.id}/builder`} className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit App
                  </Button>
                </Link>
                <Link href={`/dashboard/apps/${app.id}/edit?tab=settings`} className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    App Settings
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    const shareUrl = window.location.origin + `/dashboard/apps/${app.id}`;
                    navigator.clipboard.writeText(shareUrl).then(() => {
                      alert('✅ App URL copied to clipboard!\n\n' + shareUrl);
                    }).catch(() => {
                      alert('App URL: ' + shareUrl);
                    });
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Share App
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
