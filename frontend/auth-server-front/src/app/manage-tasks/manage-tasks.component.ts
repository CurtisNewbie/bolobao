import { Component, OnInit } from "@angular/core";
import { PagingController } from "src/models/paging";
import {
  emptyListTaskByPageReqVo,
  ListTaskByPageReqVo,
  Task,
  TaskConcurrentEnabledEnum,
  TaskEnabledEnum,
  TASK_CONCURRENT_ENABLED_OPTIONS,
  TASK_ENABLED_OPTIONS,
  UpdateTaskReqVo,
} from "src/models/task";
import { animateElementExpanding, getExpanded, isIdEqual } from "../../animate/animate-util";
import { Option } from "src/models/select-util";
import { PageEvent } from "@angular/material/paginator";
import { NotificationService } from "../notification.service";
import { TaskService } from "../task.service";
import { NavigationService, NavType } from "../navigation.service";
import { UserService } from "../user.service";

@Component({
  selector: "app-manage-tasks",
  templateUrl: "./manage-tasks.component.html",
  styleUrls: ["./manage-tasks.component.css"],
  animations: [animateElementExpanding()],
})
export class ManageTasksComponent implements OnInit {
  readonly TASKS_ENABLED_OPTS: Option<TaskEnabledEnum>[] = TASK_ENABLED_OPTIONS;
  readonly TASKS_CONCURRENT_ENABLED_OPTS: Option<TaskConcurrentEnabledEnum>[] =
    TASK_CONCURRENT_ENABLED_OPTIONS;
  readonly TASK_ENABLED = TaskEnabledEnum.ENABLED;
  readonly TASK_DISABLED = TaskEnabledEnum.DISABLED;
  readonly CONCURRENT_ENABLED = TaskConcurrentEnabledEnum.ENABLED;
  readonly CONCURRENT_DISABLED = TaskConcurrentEnabledEnum.DISABLED;
  readonly COLUMNS_TO_BE_DISPLAYED = [
    "id",
    "jobName",
    "cronExpr",
    "appGroup",
    "lastRunStartTime",
    "lastRunEndTime",
    "lastRunBy",
    "lastRunResult",
    "enabled",
    "concurrentEnabled",
    "updateDate",
    "updateBy",
  ];

  tasks: Task[] = [];
  searchParam: ListTaskByPageReqVo = emptyListTaskByPageReqVo();
  updateParam: UpdateTaskReqVo;
  pagingController: PagingController = new PagingController();
  expandedElement: Task;

  idEquals = isIdEqual;
  getExpandedEle = (row) => getExpanded(row, this.expandedElement);

  constructor(
    private taskService: TaskService,
    private notifi: NotificationService,
    private navi: NavigationService
  ) {

  }

  ngOnInit() {

  }

  fetchTaskList(): void {
    this.searchParam.pagingVo = this.pagingController.paging;
    this.taskService.fetchTaskList(this.searchParam).subscribe({
      next: (resp) => {
        this.tasks = resp.data.list;
        this.pagingController.onTotalChanged(resp.data.pagingVo);
      },
    });
  }

  update(task: Task): void {
    let param: UpdateTaskReqVo = JSON.parse(JSON.stringify(task));
    this.taskService.updateTask(param).subscribe({
      next: (resp) => {
        this.notifi.toast("Task updated");
        this.expandedElement = null;
        this.fetchTaskList();
      },
    });
  }

  triggerTask(task: Task): void {
    this.taskService
      .triggerTask({
        id: task.id,
      })
      .subscribe({
        complete: () => {
          this.notifi.toast("Task triggered");
          this.expandedElement = null;
        },
      });
  }

  viewHistory(task: Task): void {
    this.navi.navigateTo(NavType.TASK_HISTORY, [{ taskId: task.id }]);
  }

  onPagingControllerReady(pc) {
    this.pagingController = pc;
    this.pagingController.onPageChanged = () => this.fetchTaskList();
    this.fetchTaskList();
  }
}
