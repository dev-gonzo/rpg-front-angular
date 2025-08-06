import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { BaseTranslateComponent } from '@/core/base/base-translate.component';
import { createFormFromSchema } from '@/core/utils/createFormFromSchema';
import { TypedFormGroup } from '@/core/types/forms';
import { FormValidatorService } from '@/core/forms/form-validator.service';
import { createInfoEditSchema, InfoEditFormData } from './info-edit.schema';
import { InputComponent } from '@/shared/components/form/input/input.component';
import { CharacterInfoApiService } from '@/api/characters/character-info.api.servive';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '@/shared/components/toast/toast.service';

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
  private readonly characterApi = inject(CharacterInfoApiService);
  private readonly toast = inject(ToastService);

  form!: TypedFormGroup<InfoEditFormData>;
  id!: string;

  ngOnInit(): void {
    this.id = this.route.parent?.snapshot.paramMap.get('id') ?? '';

    const { form } = createFormFromSchema(
      createInfoEditSchema(this.translate),
      this.onSubmit.bind(this),
    );

    this.form = form;
    this.loadCharacter();

    requestAnimationFrame(() => this.cdRef.detectChanges());
  }

  loadCharacter(): void {
    this.characterApi.characterInfo(this.id).subscribe({
      next: (character) => {
        this.form.patchValue({
          ...character,
          birthDate:
            character.birthDate instanceof Date
              ? character.birthDate.toISOString().split('T')[0] as string
              : new Date(character.birthDate).toISOString().split('T')[0],
        });
      },
      error: (err) => {
        this.toast.error(this.translate.instant('MSG.ERROR.LOAD'));
        console.error(err);
      },
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
