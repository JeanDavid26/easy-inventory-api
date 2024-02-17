import { Injectable } from '@nestjs/common';
import { InventoryManagerService } from 'src/database/db-manager/inventory-manager/inventory-manager.service';
import { ArticleQuantity } from 'src/database/entities/ArticleQuantity.entity';
import { ArticleQuantityTransaction } from 'src/database/entities/ArticleQuantityTransaction.entity';
import { Inventory } from 'src/database/entities/Inventory.entity';

@Injectable()
export class InventoryService {
  constructor(private _inventoryManagerService: InventoryManagerService) {}

  public async list(): Promise<Inventory[]> {
    const tInventory = await this._inventoryManagerService.list();
    for (const inventory of tInventory) {
      const valueQuantity = this._valueQuantityInventory(
        inventory.tArticleQuantity,
      );
      inventory.value = valueQuantity.value;
      inventory.quantity = valueQuantity.quantity;
    }
    return tInventory;
  }

  public async get(id: number): Promise<Inventory> {
    const inventory = await this._inventoryManagerService.get(id);
    const valueQuantity = this._valueQuantityInventory(
      inventory.tArticleQuantity,
    );
    inventory.value = valueQuantity.value;
    inventory.quantity = valueQuantity.quantity;
    for (const transaction of inventory.tTransaction) {
      const valueQuantityTransaction = this._valueQuantityTransaction(
        transaction.tArticleQuantityTransaction,
      );
      transaction.quantity = valueQuantityTransaction.quantity;
      transaction.value = valueQuantityTransaction.value;
    }
    return inventory;
  }

  private _valueQuantityInventory(tArticleQuantity: ArticleQuantity[]): {
    value: number;
    quantity: number;
  } {
    let value = 0;
    let quantity = 0;
    if (tArticleQuantity.length > 0) {
      for (const articleQuantity of tArticleQuantity) {
        articleQuantity.value =
          articleQuantity.quantity * articleQuantity.oArticle.unitPrice;
        value += articleQuantity.quantity * articleQuantity.oArticle.unitPrice;
        quantity += articleQuantity.quantity;
      }
    }
    return { value, quantity };
  }

  private _valueQuantityTransaction(
    tArticleQuantity: ArticleQuantityTransaction[],
  ): {
    value: number;
    quantity: number;
  } {
    let value = 0;
    let quantity = 0;
    if (tArticleQuantity?.length > 0) {
      for (const articleQuantity of tArticleQuantity) {
        value += articleQuantity.quantity * articleQuantity.unitPrice;
        quantity += articleQuantity.quantity;
      }
    }
    return { value, quantity };
  }
}
