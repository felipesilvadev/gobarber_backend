import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import DeleteUserAvatarService from '@modules/users/services/DeleteUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatar_filename: request.file.filename,
    });

    return response.json(classToClass(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteUserAvatar = container.resolve(DeleteUserAvatarService);

    const user = await deleteUserAvatar.execute({
      user_id: request.user.id,
    });

    return response.json(classToClass(user));
  }
}
