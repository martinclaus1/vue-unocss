import { defineConfig, presetIcons, transformerDirectives } from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import presetUno from '@unocss/preset-uno'

const colors = {
  primary: {
    '50': '#EEF6FF',
    '100': '#CCE4FF',
    '200': '#99CCFF',
    '300': '#66B2FF',
    '400': '#3399FF',
    '500': '#007FFF',
    '600': '#0066CC',
    '700': '#004C99',
    '800': '#003366',
    '900': '#001933',
  },
}

export default defineConfig({
  transformers: [transformerDirectives()],
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
      },
      collections: {
        'my-icons': FileSystemIconLoader('./src/icons'),
      },
    }),
  ],
  outputToCssLayers: {
    cssLayerName: (layer) => {
      if (layer === 'default') {
        return 'uno-default'
      }
      if (layer === 'preflights') {
        return 'uno-preflight'
      }
      if(layer === 'icons') {
        return 'uno-icons'
      }
    },
  },
  theme: {
    colors,
  },
  preflights: [
    {
      getCSS: ({ theme }) => {
        const colorVariables = Object.entries(theme.colors)
          .map(([colorName, shades]) => {
            const shadeVariables = Object.entries(shades)
              .map(([shade, value]) => `--${colorName}-${shade}: ${value};`)
              .join('\n')
            return shadeVariables
          })
          .join('\n')

        return `
        :root {
          ${colorVariables}
        }
      `
      },
    },
  ],
})
