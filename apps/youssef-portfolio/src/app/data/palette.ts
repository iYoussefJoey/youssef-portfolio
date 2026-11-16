import { PaletteColour, Theme } from './models';

/** Joey Frost UI palette chips, six per theme. */
export const PALETTE: Record<Theme, readonly PaletteColour[]> = {
  light: [
    { role: $localize`:@@pal.main:Main`, name: 'Sapphire', hex: '#1D46B8', ink: '#FFFFFF' },
    { role: $localize`:@@pal.hover:Hover`, name: 'Ice', hex: '#DCE8FF', ink: '#1A40A8' },
    { role: $localize`:@@pal.links:Links`, name: 'Cobalt', hex: '#0047AB', ink: '#FFFFFF' },
    { role: $localize`:@@pal.headings:Headings`, name: 'Ink', hex: '#0A1633', ink: '#FFFFFF' },
    { role: $localize`:@@pal.background:Background`, name: 'Mist', hex: '#F5F8FF', ink: '#0A1633' },
    { role: $localize`:@@pal.body:Body text`, name: 'Slate', hex: '#424E6C', ink: '#FFFFFF' },
  ],
  dark: [
    { role: $localize`:@@pal.main:Main`, name: 'Periwinkle', hex: '#9BB8FF', ink: '#0B1530' },
    { role: $localize`:@@pal.hover:Hover`, name: 'Deep ice', hex: '#24396F', ink: '#FFFFFF' },
    { role: $localize`:@@pal.links:Links`, name: 'Ice light', hex: '#BFD3FF', ink: '#0B1530' },
    { role: $localize`:@@pal.headings:Headings`, name: 'Snow', hex: '#EBF1FF', ink: '#0B1530' },
    { role: $localize`:@@pal.background:Background`, name: 'Night', hex: '#0B1530', ink: '#EBF1FF' },
    { role: $localize`:@@pal.body:Body text`, name: 'Mist', hex: '#B4C1DF', ink: '#0B1530' },
  ],
};
