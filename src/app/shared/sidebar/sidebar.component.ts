import { Component } from '@angular/core';
import { routes } from '../../consts/routes';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
 interface FoodNode {
  name: string;
  children?: FoodNode[];
  url:string;
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Acceso Personal',
    url: '#',
    children: [
      {name: 'Persona', url:'#' + routes.PERSONA}, 
      {name: 'Items', url: '#'}, 
      {name: 'Asignaciones', url: '#'},
      {name: 'Jerarquias', url: '#'}],
  },
  {
    name: 'Trazabilidad',
    url: '#',
    children: [
      {name: 'Recepción materia carnica', url: '#'},
      {name: 'Recepción materia no carnica', url: '#'},
      {name: 'Recepción vegetales', url: '#'},
      {name: 'Orden de Producción', url: '#'},
      {name: 'Embutidora', url: '#'},
      {name: 'Control horneado', url: '#'},
      {name: 'Producto no conforme', url: '#'},
      {name: 'Inventario Empaque al Vacio', url: '#'},
      {name: 'Despachos Pedidos', url: '#'}
    ]
  },
  {
    name: 'Parametrizacion',
    url: '#',
    children: [
      {name: 'Parametrizacion Tipo', url: '#'},
      {name: 'Formula Estimado', url: '#'},
      {name: 'Seccionar Orden Producción', url: '#'},
      {name: 'Proveedor', url: '#'},
      {name: 'Traslados', url: '#'},
      {name: 'Asignar Producto a Proveedor', url: '#'},
      {name: 'Producto', url: '#'},
      {name: 'Insumos', url: '#'},
      {name: 'Formulacion', url: '#'},
      {name: 'Administrador de precios', url: '#'}
    ]
  },
  {
    name: 'Clientes',
    url: '#',
    children: [
      {name: 'Clientes', url: '#'}
    ]
  },
  {
    name: 'Reportes',
    url: '#',
    children: [
      {name: 'Producción', url: '#'},
      {name: 'Insumos', url: '#'},
      {name: 'Producto', url: '#'},
      {name: 'Traslados', url: '#'},
      {name: 'Proveedor Disponible', url: '#'},
      {name: 'Proveedor Cargado', url: '#'},
      {name: 'Embutidos', url: '#'},
      {name: 'Entradas por tipo', url: '#'},
      {name: 'Ordenes de producción', url: '#'},
      {name: 'Mermas', url: '#'}
    ]
  }
  /*{
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },*/
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  url:string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      url:node.url
    };
  };

  public routes: typeof routes = routes;
  public isOpenUiElements = false;

  public openUiElements() {
    this.isOpenUiElements = !this.isOpenUiElements;
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
