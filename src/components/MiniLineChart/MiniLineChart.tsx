import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Circle, Line, Polyline, Text as SvgText } from 'react-native-svg';
import { colors } from '../../theme/colors';
import { fontSize } from '../../theme/typography';

import { styles } from './MiniLineChart.styles';

interface Series {
  label: string;
  color: string;
  values: number[];
}

interface Props {
  categories: string[];
  series: Series[];
  height?: number;
}

// Gráfico de linha leve, sem dependências externas de charting (que são
// web-only), pensado para caber bem em telas de smartphone.
export default function MiniLineChart({ categories, series, height = 200 }: Props) {
  const width = 320;
  const paddingLeft = 36;
  const paddingBottom = 24;
  const paddingTop = 12;
  const chartWidth = width - paddingLeft - 12;
  const chartHeight = height - paddingBottom - paddingTop;

  const allValues = series.flatMap((s) => s.values);
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const range = max - min || 1;

  const toX = (i: number) => paddingLeft + (i / (categories.length - 1)) * chartWidth;
  const toY = (v: number) => paddingTop + chartHeight - ((v - min) / range) * chartHeight;

  return (
    <View>
      <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Linhas de grade horizontais */}
        {[0, 0.5, 1].map((f) => (
          <Line
            key={f}
            x1={paddingLeft}
            x2={width - 12}
            y1={paddingTop + chartHeight * f}
            y2={paddingTop + chartHeight * f}
            stroke={colors.border}
            strokeWidth={1}
          />
        ))}

        {series.map((s) => (
          <Polyline
            key={s.label}
            points={s.values.map((v, i) => `${toX(i)},${toY(v)}`).join(' ')}
            fill="none"
            stroke={s.color}
            strokeWidth={3}
          />
        ))}

        {series.map((s) =>
          s.values.map((v, i) => (
            <Circle key={`${s.label}-${i}`} cx={toX(i)} cy={toY(v)} r={4} fill={s.color} />
          ))
        )}

        {categories.map((cat, i) => (
          <SvgText
            key={cat}
            x={toX(i)}
            y={height - 4}
            fontSize={11}
            fill={colors.mutedForeground}
            textAnchor="middle"
          >
            {cat}
          </SvgText>
        ))}
      </Svg>
      {series.length > 1 && (
        <View style={styles.legend}>
          {series.map((s) => (
            <View key={s.label} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: s.color }]} />
              <Text style={styles.legendLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
