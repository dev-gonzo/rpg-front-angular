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

import { CharacterAttributesApiService } from '@/api/characters/character-attributes.api.servive';
import { CharacterAttributesRequest } from '@/api/characters/character-attributes.types';
import { BaseTranslateComponent } from '@/core/base/base-translate.component';
import { FormValidatorService } from '@/core/forms/form-validator.service';
import { TypedFormGroup } from '@/core/types/forms';
import { createFormFromSchema } from '@/core/utils/create-form-from-schema';
import { processApiError } from '@/core/utils/process-api-error';
import { InputNumberComponent } from '@/shared/components/form/input-number/input-number.component';
import { ToastService } from '@/shared/components/toast/toast.service';
import { AttributesTypePage } from '../atributes.types';
import {
  CharacterAttributesFormData,
  createCharacterAttributesSchema,
} from './attributes-edit.schema';

@Component({
  selector: 'app-attributes-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    InputNumberComponent,
  ],
  templateUrl: './attributes-edit.component.html',
})
export class AttributesEditComponent
  extends BaseTranslateComponent
  implements OnInit
{
  @Input() attributes: AttributesTypePage | null = null;
  @Input() characterId: string = '';

  total: number = 0;
  totalMod: number = 0;

  private readonly cdRef = inject(ChangeDetectorRef);
  private readonly validator = inject(FormValidatorService);
  private readonly toast = inject(ToastService);
  private readonly characterAttributesApi = inject(CharacterAttributesApiService);

  form!: TypedFormGroup<CharacterAttributesFormData>;

  ngOnInit(): void {
    const { form } = createFormFromSchema(
      createCharacterAttributesSchema(this.translate),
      this.onSubmit.bind(this),
    );

    this.form = form;
    this.applyAttrributesPatch();

    this.form.statusChanges.subscribe(() => {
      this.sunTotal();
      this.sunModTotal();
    });

    requestAnimationFrame(() => this.cdRef.detectChanges());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['attributes'] && this.attributes && this.form) {
      this.applyAttrributesPatch();
    }
  }

  private applyAttrributesPatch(): void {
    this.form.patchValue({
      con: this.attributes?.con ?? 10,
      fr: this.attributes?.fr ?? 10,
      dex: this.attributes?.dex ?? 10,
      agi: this.attributes?.agi ?? 10,
      int: this.attributes?.int ?? 10,
      will: this.attributes?.will ?? 10,
      per: this.attributes?.per ?? 10,
      car: this.attributes?.car ?? 10,

      conMod: this.attributes?.conMod ?? 0,
      frMod: this.attributes?.frMod ?? 0,
      dexMod: this.attributes?.dexMod ?? 0,
      agiMod: this.attributes?.agiMod ?? 0,
      intMod: this.attributes?.intMod ?? 0,
      willMod: this.attributes?.willMod ?? 0,
      perMod: this.attributes?.perMod ?? 0,
      carMod: this.attributes?.carMod ?? 0,
    });

    this.sunTotal();
    this.sunModTotal();
  }

  private sunTotal(): void {
    this.total =
      (this.form?.value?.con || 0) +
      (this.form?.value?.fr || 0) +
      (this.form?.value?.dex || 0) +
      (this.form?.value?.agi || 0) +
      (this.form?.value?.int || 0) +
      (this.form?.value?.will || 0) +
      (this.form?.value?.per || 0) +
      (this.form?.value?.car || 0);
  }

  private sunModTotal(): void {
    this.totalMod =
      (this.form?.value?.conMod || 0) +
      (this.form?.value?.frMod || 0) +
      (this.form?.value?.dexMod || 0) +
      (this.form?.value?.agiMod || 0) +
      (this.form?.value?.intMod || 0) +
      (this.form?.value?.willMod || 0) +
      (this.form?.value?.perMod || 0) +
      (this.form?.value?.carMod || 0);
  }

  public percentageValue(attribute: string) {
    const controlAttribute = this.form.get(attribute);
    const controlMod = this.form.get(`${attribute}Mod`);
    const value = controlAttribute?.value ?? 0;
    const valueMod = controlMod?.value ?? 0;

    return (value + valueMod) * 4;
  }

  async onSubmit(): Promise<void> {
    const schema = createCharacterAttributesSchema(this.translate);
    const result = await this.validator.validateForm(this.form, schema);

    if (!result.success) {
      this.form.markAllAsTouched();
      this.cdRef.detectChanges();
      return;
    }

    if (this.characterId) {
      this.characterAttributesApi
        .saveCharacterAttributes(this.characterId, {
          ...(this.form.value as CharacterAttributesRequest),
        })
        .subscribe({
          next: () => {
            this.toast.success(
              this.translate.instant('MSG.REST.SUCCESS', {
                resource: this.translate.instant('PAGE.CHARACTER.ATTRIBUTES.TITLE'),
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
