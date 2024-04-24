import { Injectable } from '@angular/core';
import { ICONS } from 'src/lib/icons/icons';

export type IconType = keyof typeof ICONS;

@Injectable({
  providedIn: 'root'
})
export class IconService {
   /**
   * Return the SVG content for an icon
   * @param name Name of the icon to get the SVG for
   */

  public getSvgForName(name: IconType): string {
    return ICONS[name];
  }
}
