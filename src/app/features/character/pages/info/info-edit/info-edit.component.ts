import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { CharacterInfoDto } from '@/api/characters/character-info.types';
import { BaseTranslateComponent } from '@/core/base/base-translate.component';
import { FormValidatorService } from '@/core/forms/form-validator.service';
import { TypedFormGroup } from '@/core/types/forms';
import { createFormFromSchema } from '@/core/utils/createFormFromSchema';
import { InputComponent } from '@/shared/components/form/input/input.component';
import { ToastService } from '@/shared/components/toast/toast.service';
import { createInfoEditSchema, InfoEditFormData } from './info-edit.schema';
import { formatToDayMonthYear } from '@/core/utils/formatToDayMonthYear';

@Component({
  selector: 'app-info-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, TranslateModule],
  templateUrl: './info-edit.component.html',
})
export class InfoEditComponent
  extends BaseTranslateComponent
  implements OnInit
{
  private readonly cdRef = inject(ChangeDetectorRef);
  private readonly validator = inject(FormValidatorService);
  private readonly toast = inject(ToastService);
  @Input() character: CharacterInfoDto | null = null;

  form!: TypedFormGroup<InfoEditFormData>;
  id!: string;

  ngOnInit(): void {
    this.id = this.route.parent?.snapshot.paramMap.get('id') ?? '';

    const { form } = createFormFromSchema(
      createInfoEditSchema(this.translate),
      this.onSubmit.bind(this),
    );

    this.form = form;
    if (this.character) {
      this.applyCharacterPatch();
    }

    requestAnimationFrame(() => this.cdRef.detectChanges());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['character'] && this.character && this.form) {
      this.applyCharacterPatch();
    }
  }

  private applyCharacterPatch(): void {
    this.form.patchValue({
      ...this.character,
      birthDate: formatToDayMonthYear(this.character?.birthDate),
    });
  }

  async onSubmit(): Promise<void> {
    const schema = createInfoEditSchema(this.translate);
    const result = await this.validator.validateForm(this.form, schema);

    if (!result.success) {
      this.form.markAllAsTouched();
      this.cdRef.detectChanges();
      return;
    }

    // this.characterApi.updateCharacter(this.id, this.form.value).subscribe({
    //   next: () => {
    //     this.toast.success(this.translate.instant('MSG.SAVE.SUCCESS'));
    //   },
    //   error: (err) => {
    //     this.toast.error(this.translate.instant('MSG.SAVE.ERROR'));
    //     console.error(err);
    //   },
    // });
  }
}
