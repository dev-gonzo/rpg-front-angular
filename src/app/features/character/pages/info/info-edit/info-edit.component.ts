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

import { CharacterInfoApiService } from '@/api/characters/character-info.api.servive';
import {
  CharacterInfoRequest,
  CharacterInfoResponse,
} from '@/api/characters/character-info.types';
import { BaseTranslateComponent } from '@/core/base/base-translate.component';
import { FormValidatorService } from '@/core/forms/form-validator.service';
import { TypedFormGroup } from '@/core/types/forms';
import { createFormFromSchema } from '@/core/utils/create-form-from-schema';
import { formatToDayMonthYear } from '@/core/utils/format-to-date-only';
import { formatDateToISO } from '@/core/utils/format-date-to-ISO';
import { InputComponent } from '@/shared/components/form/input/input.component';
import { ToastService } from '@/shared/components/toast/toast.service';
import { createInfoEditSchema, InfoEditFormData } from './info-edit.schema';
import { processApiError } from '@/core/utils/process-api-error';
import { CharacterApiService } from '@/api/characters/character.api.servive';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-info-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    TranslateModule,
  ],
  templateUrl: './info-edit.component.html',
})
export class InfoEditComponent
  extends BaseTranslateComponent
  implements OnInit
{
  @Input() character: CharacterInfoResponse | null = null;
  @Input() characterId: string = '';

  private readonly cdRef = inject(ChangeDetectorRef);
  private readonly validator = inject(FormValidatorService);
  private readonly toast = inject(ToastService);
  private readonly characterInfoApi = inject(CharacterInfoApiService);
  private readonly characterApi = inject(CharacterApiService);

  form!: TypedFormGroup<InfoEditFormData>;

  ngOnInit(): void {
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

    if (this.characterId) {
      this.characterInfoApi
        .saveCharacterInfo(this.characterId, {
          ...(this.form.value as CharacterInfoRequest),
          birthDate: formatDateToISO(this.form.value.birthDate),
        })
        .subscribe({
          next: () => {
            this.toast.success(
              this.translate.instant('MSG.REST.SUCCESS', {
                resource: this.translate.instant('COMMON.CHARACTER'),
              }),
            );
          },
          error: (err) => {
            const msg = processApiError(err, this.translate);
            this.toast.error(msg);
          },
        });
    }

    if (!this.characterId) {
      this.characterApi
        .saveCharacter({
          ...(this.form.value as CharacterInfoRequest),
          birthDate: formatDateToISO(this.form.value.birthDate),
        })
        .subscribe({
          next: () => {
            this.toast.success(
              this.translate.instant('MSG.REST.SUCCESS', {
                resource: this.translate.instant('COMMON.CHARACTER'),
              }),
            );
          },
          error: (err) => {
            const msg = processApiError(err, this.translate);
            this.toast.error(msg);
          },
        });
    }
  }
}
