import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { EDUCATION, QUOTES, QUOTE_SOURCE, ROLES } from '../../data/experience';
import { LINKS } from '../../data/links';
import { ICON_PATHS } from '../../shared/icons';
import { PressFeedbackDirective } from '../../shared/press-feedback.directive';
import { RevealDirective } from '../../shared/reveal.directive';

/** 04 · Experience: sticky intro, the timeline (three roles + education) and two LinkedIn recommendations. */
@Component({
  selector: 'app-experience',
  imports: [RevealDirective, PressFeedbackDirective],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  protected readonly roles = ROLES;
  protected readonly education = EDUCATION;
  protected readonly quotes = QUOTES;
  protected readonly quoteSource = QUOTE_SOURCE;
  protected readonly links = LINKS;
  protected readonly icons = ICON_PATHS;
}
